import { derived, get, writable } from 'svelte/store';

import { selectedCar } from '../store.js';

export const EMAIL_INTERESTS = [
  { key: 'all', label: 'All updates', description: 'All comma email updates' },
  { key: 'general', label: 'General updates', description: 'New products, sales, and more', fieldName: 'group[54660][1]' },
  { key: 'releases', label: 'New openpilot releases', description: 'Major changes and improvements', fieldName: 'group[54660][4]' },
  { key: 'compatibility', label: 'Car compatibility updates', description: 'Newly supported cars', fieldName: 'group[54660][2]' },
  { key: 'blog', label: 'New blog posts', description: 'New posts on the comma blog', fieldName: 'group[54660][8]' },
];

const REAL_EMAIL_INTEREST_KEYS = EMAIL_INTERESTS
  .filter(({ key }) => key !== 'all')
  .map(({ key }) => key);

function createEmailInterestSelection(defaultCategory = 'all') {
  return Object.fromEntries(
    EMAIL_INTERESTS.map(({ key }) => [key, defaultCategory === 'all' || defaultCategory === key]),
  );
}

function updateEmailInterestSelection(selectedInterests, interest, checked) {
  if (interest === 'all') {
    return Object.fromEntries(EMAIL_INTERESTS.map(({ key }) => [key, checked]));
  }

  const nextInterests = {
    ...selectedInterests,
    [interest]: checked,
  };
  nextInterests.all = REAL_EMAIL_INTEREST_KEYS.every((key) => nextInterests[key]);
  return nextInterests;
}

function getEmailInterestSelectionState(selectedInterests) {
  const selectedCount = REAL_EMAIL_INTEREST_KEYS.filter((key) => selectedInterests[key]).length;

  return {
    someSelected: selectedCount > 0,
    allSelected: selectedCount === REAL_EMAIL_INTEREST_KEYS.length,
  };
}

export function setCheckboxIndeterminate(node, indeterminate) {
  node.indeterminate = indeterminate;

  return {
    update(value) {
      node.indeterminate = value;
    },
  };
}

function cleanMailchimpMessage(message) {
  const element = document.createElement('div');
  element.innerHTML = message;
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
      if (fieldName && selectedInterests[key]) params.set(fieldName, '1');
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
        reject(new Error(cleanMailchimpMessage(response.msg || 'Please try again.')));
      }
    };

    script.onerror = function() {
      cleanUp();
      reject(new Error('We could not reach Mailchimp. Please try again.'));
    };

    script.src = `https://comma.us12.list-manage.com/subscribe/post?${params}`;
    document.body.appendChild(script);
  });
}

export function createEmailUpdatesForm(defaultCategory = 'all') {
  const email = writable('');
  const interests = writable(createEmailInterestSelection(defaultCategory));
  const status = writable('idle');
  const errorMessage = writable('');
  const selection = derived(interests, getEmailInterestSelectionState);

  function toggle(interest, checked) {
    interests.update((current) => updateEmailInterestSelection(current, interest, checked));
  }

  async function submit() {
    if (!get(selection).someSelected) {
      errorMessage.set('Choose at least one type of update.');
      status.set('error');
      return false;
    }

    status.set('submitting');
    errorMessage.set('');

    try {
      await submitEmailUpdates(get(email), get(interests));
      status.set('success');
      return true;
    } catch (error) {
      errorMessage.set(error.message);
      status.set('error');
      return false;
    }
  }

  return { email, interests, status, errorMessage, selection, toggle, submit };
}
