import { get, writable } from 'svelte/store';

import { selectedCar } from '../store.js';

export const EMAIL_INTERESTS = [
  { key: 'general', label: 'General updates', description: 'New products, sales, and more', fieldName: 'group[54660][1]' },
  { key: 'releases', label: 'New openpilot releases', description: 'Major changes and improvements', fieldName: 'group[54660][4]' },
  { key: 'compatibility', label: 'Car compatibility updates', description: 'Newly supported cars', fieldName: 'group[54660][2]' },
  { key: 'blog', label: 'New blog posts', description: 'New posts on the comma blog', fieldName: 'group[54660][8]' },
];

const INTEREST_KEYS = EMAIL_INTERESTS.map(({ key }) => key);

// No category means every interest
function createEmailInterestSelection(defaultCategory) {
  return Object.fromEntries(
    INTEREST_KEYS.map((key) => [key, !defaultCategory || key === defaultCategory]),
  );
}

export function anySelected(selectedInterests) {
  return INTEREST_KEYS.some((key) => selectedInterests[key]);
}

export function allSelected(selectedInterests) {
  return INTEREST_KEYS.every((key) => selectedInterests[key]);
}

function cleanMailchimpMessage(message) {
  const element = document.createElement('div');
  element.innerHTML = message ?? '';
  return element.textContent || 'Please try again.';
}

function submitEmailUpdates(email, selectedInterests) {
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

    const car = get(selectedCar);
    if (car) params.set('SELECTCAR', car);
    for (const { key, fieldName } of EMAIL_INTERESTS) {
      if (selectedInterests[key]) params.set(fieldName, '1');
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

export function createEmailUpdatesForm(defaultCategory) {
  const email = writable('');
  const interests = writable(createEmailInterestSelection(defaultCategory));
  const status = writable('idle');  // idle | submitting | success | error
  const errorMessage = writable('');

  function toggle(interest, checked) {
    interests.update((current) => ({ ...current, [interest]: checked }));
  }

  async function submit() {
    if (!anySelected(get(interests))) {
      errorMessage.set('Choose at least one type of update.');
      status.set('error');
      return;
    }

    status.set('submitting');

    try {
      await submitEmailUpdates(get(email), get(interests));
      status.set('success');
    } catch (error) {
      errorMessage.set(error.message);
      status.set('error');
    }
  }

  return { email, interests, status, errorMessage, toggle, submit };
}
