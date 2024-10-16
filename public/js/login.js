const loginFormHandler = async function (event) {
  event.preventDefault();

  const emailEl = document
    .querySelector('#email-input-login')
    .value.trim();
  const passwordEl = document
    .querySelector('#password-input-login')
    .value.trim();

  const response = await fetch('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email: emailEl,
      password: passwordEl,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/bookSearch');
  } else {
    alert('Failed to login');
  }
};

document
  .querySelector('#login-form')
  .addEventListener('submit', loginFormHandler);
