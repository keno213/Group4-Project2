const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document
    .querySelector('#username-input-signup')
    .value.trim();
  const emailEl = document
    .querySelector("#email-input-signup")
    .value.trim();
  const passwordEl = document
    .querySelector('#password-input-signup')
    .value.trim();

  if (passwordEl.length >= 8 && usernameEl) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({
        username: usernameEl,
        email: emailEl,
        password: passwordEl,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/bookSearch');
    } else {
      alert('Failed to sign up');
    }
  } else {
    alert(
      'Please include a username, email and password. Make sure your password is at least 8 characters long'
    );
  }
};

document
  .querySelector('#signup-form')
  .addEventListener('submit', signupFormHandler);
