<script>
  export let label = "Get the latest updates";
  export let style = "accent";

  let email = '';
  let completed = false;
  let submissionPromise;

  function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    submissionPromise = new Promise((resolve, reject) => {
      const params = new URLSearchParams(formData);
      const script = document.createElement("script");
      const callbackName = 'mailchimpFormSubmit_' + Math.random().toString(36).substr(2, 9);
      script.src = `https://comma.us12.list-manage.com/subscribe/post?u=e127cf7151180db2b566d880b&id=f150bd2a9c&EMAIL=${params.get('email')}&Email=${params.get('email')}&c=${callbackName}`;

      window[callbackName] = function(response) {
        completed = true;
        if (response.result === "success") {
          resolve();
        } else {
          reject(new Error(response.msg));
        }
        document.body.removeChild(script);
        delete window[callbackName];
      };

      document.body.appendChild(script);
    });
  }
</script>

{#if !completed}
  <form aria-label="Email Form" on:submit={handleFormSubmit} class:primary={style == "primary"} class:accent={style == "accent"}>
    <label for="form">{label}</label>
    <input maxlength="256" name="email" data-name="Email" placeholder="Enter your email" type="email" bind:value={email}>
    <input type="submit" data-wait="Please wait..." value="Subscribe" disabled={email.length === 0}>
  </form>
{:else}
  {#await submissionPromise then response}
    <div class="success">
      <p>Thanks for signing up! We only send emails we would want to receive.</p>
    </div>
  {:catch error}
    <div class="error">
      <p>Oops! Something went wrong while submitting the form.</p>
      <p>{@html error.message}</p>
    </div>
  {/await}
{/if}
<style>
  form.primary {
    & label {
      color: rgba(2555, 255, 255, 0.65);
    }
    & input[type="email"] {
      color: #fff;
      background-color: transparent;
      border: 1px solid rgba(2555, 255, 255, 0.65);
      height: 2rem;
      font-size: 1rem;
    }
    & input[type="submit"] {
      color: white;
      background-color: #525252;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          background-color: #727171;
        }
      }
      &:active {
        background-color: #727171;
      }
    }
  }

  form.accent {
    & input[type="submit"] {
      color: black;
      background-color: var(--color-accent);
    }
  }

  label {
    display: block;
    text-transform: uppercase;
    font-family: Inter, sans-serif;
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
    letter-spacing: 0.5px;
  }

  input[type="email"] {
    padding: 1.4rem 1rem;
    border: 1px solid #000;
    font-size: 0.875rem;
    font-family: Inter, sans-serif;
    margin-bottom: 1rem;
    width: 100%;
    box-sizing: border-box;

    &:active, &:focus, &:hover {
      border-color: white !important;
    }
  }

  input[type="submit"] {
    border: none;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    justify-content: center;
    padding: 1rem 4rem;
    font-size: 1.125rem;
    font-weight: 600;
    font-family: Inter, sans-serif;
    display: flex;
    cursor: pointer;
    transition: all 0.2s;
    width: 100%;

    &[disabled] {
      cursor: not-allowed;
    }
  }

  .success, .error {
    padding: 1rem;
    text-align: center;
  }

  .success {
    background-color: rgba(81, 255, 0, .1);
    border: 1px solid rgba(81, 255, 0, .35);
  }

  .error {
    background-color: rgba(255, 0, 0, .12);
    border: 1px solid red;
  }
</style>
