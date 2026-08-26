import { get, writable } from 'svelte/store';

export const EMAIL_CATEGORIES = [
  { key: 'product', label: 'Product updates', description: 'New products and sales', fieldName: 'group[54660][1]' },
  { key: 'releases', label: 'New openpilot releases', description: 'Major changes and improvements', fieldName: 'group[54660][4]' },
  { key: 'compatibility', label: 'Car compatibility updates', description: 'Newly supported cars', fieldName: 'group[54660][2]' },
  { key: 'blog', label: 'New blog posts', description: 'New posts on the comma blog', fieldName: 'group[54660][8]' },
];

function cleanMailchimpMessage(message) {
  const element = document.createElement('div');
  element.innerHTML = message ?? '';
  return element.textContent || 'Please try again.';
}

function submitEmailUpdates(email, selectedCategories, car) {
  return new Promise((resolve, reject) => {
    const callbackName = `mailchimpEmailUpdates_${Math.random().toString(36).slice(2, 11)}`;
    const script = document.createElement('script');
    const params = new URLSearchParams({
      u: 'e127cf7151180db2b566d880b',
      id: 'f150bd2a9c',
      EMAIL: email,
      SOURCE: window.location.pathname,
      c: callbackName,
    });

    // Send entered car by user
    if (car) params.set('VCAR', car);

    for (const { key, fieldName } of EMAIL_CATEGORIES) {
      if (selectedCategories.includes(key)) params.set(fieldName, '1');
    }

    function cleanUp() {
      script.remove();
      delete window[callbackName];
    }

    window[callbackName] = function(response) {
      const alreadySubscribed = /already subscribed/i.test(response.msg || '');
      cleanUp();

      if (response.result === 'success' || alreadySubscribed) {
        resolve(response);
      } else {
        reject(new Error(cleanMailchimpMessage(response.msg)));
      }
    };

    script.onerror = function() {
      cleanUp();
      reject(new Error('Could not connect. Please try again.'));
    };

    script.src = `https://comma.us12.list-manage.com/subscribe/post?${params}`;
    document.body.appendChild(script);
  });
}

export function createEmailUpdatesForm() {
  const email = writable('');
  const car = writable('');
  const selectedCategories = writable(EMAIL_CATEGORIES.map(({ key }) => key));
  const status = writable('idle');  // idle | submitting | success | error
  const errorMessage = writable('');

  async function submit() {
    if (!get(selectedCategories).length) {
      errorMessage.set('Choose at least one type of update');
      status.set('error');
      return;
    }

    status.set('submitting');

    try {
      await submitEmailUpdates(get(email), get(selectedCategories), get(car).trim());
      status.set('success');
    } catch (error) {
      errorMessage.set(error.message);
      status.set('error');
    }
  }

  return { email, car, selectedCategories, status, errorMessage, submit };
}
