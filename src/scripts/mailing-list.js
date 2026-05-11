// Mailchimp JSONP submit. Each form root has class .mailing-list-form.

function init() {
  document.querySelectorAll('.mailing-list-form').forEach((root) => {
    if (root.dataset.mlInited) return;
    root.dataset.mlInited = '1';

    const form = root.querySelector('form');
    const successEl = root.querySelector('.mailing-success');
    const errorEl = root.querySelector('.mailing-error');
    const errorMsgEl = root.querySelector('.mailing-error-message');
    const emailInput = root.querySelector('input[type="email"]');
    const submitBtn = root.querySelector('input[type="submit"]');

    if (emailInput && submitBtn) {
      const sync = () => {
        submitBtn.disabled = !emailInput.value.length;
      };
      emailInput.addEventListener('input', sync);
      sync();
    }

    form?.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const params = new URLSearchParams(formData);
      const email = params.get('email');
      const callbackName = 'mailchimpFormSubmit_' + Math.random().toString(36).slice(2, 11);
      const script = document.createElement('script');
      script.src = `https://comma.us12.list-manage.com/subscribe/post?u=e127cf7151180db2b566d880b&id=f150bd2a9c&EMAIL=${email}&Email=${email}&c=${callbackName}`;

      window[callbackName] = (response) => {
        form.style.display = 'none';
        if (response.result === 'success') {
          if (successEl) successEl.style.display = 'block';
        } else {
          if (errorEl) errorEl.style.display = 'block';
          if (errorMsgEl) errorMsgEl.innerHTML = response.msg ?? 'Unknown error';
        }
        document.body.removeChild(script);
        delete window[callbackName];
      };

      document.body.appendChild(script);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
