export const EMAIL_INTERESTS = [
  { key: 'all', label: 'All updates' },
  { key: 'general', label: 'General updates', fieldName: 'group[54660][1]' },
  { key: 'releases', label: 'New openpilot releases', fieldName: 'group[54660][4]' },
  { key: 'compatibility', label: 'Car compatibility updates', fieldName: 'group[54660][2]' },
  { key: 'blog', label: 'New blog posts', fieldName: 'group[54660][8]' },
];

export const REAL_EMAIL_INTEREST_KEYS = EMAIL_INTERESTS
  .filter(({ key }) => key !== 'all')
  .map(({ key }) => key);

export function createEmailInterestSelection(defaultCategory = 'all') {
  return Object.fromEntries(
    EMAIL_INTERESTS.map(({ key }) => [key, defaultCategory === 'all' || defaultCategory === key]),
  );
}

export function updateEmailInterestSelection(selectedInterests, interest, checked) {
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

export function getEmailInterestSelectionState(selectedInterests) {
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

export function submitEmailUpdates(email, selectedInterests) {
  return new Promise((resolve, reject) => {
    const selectedCar = window.localStorage.getItem('selectedCar');
    const callbackName = `mailchimpEmailUpdates_${Math.random().toString(36).slice(2, 11)}`;
    const script = document.createElement('script');
    const params = new URLSearchParams({
      u: 'e127cf7151180db2b566d880b',
      id: 'f150bd2a9c',
      EMAIL: email,
      Email: email,
      SOURCE: window.location.pathname,
      c: callbackName,
    });

    if (selectedCar) params.set('SELECTCAR', selectedCar);
    for (const { key, fieldName } of EMAIL_INTERESTS) {
      if (fieldName && selectedInterests[key]) params.set(fieldName, '');
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
