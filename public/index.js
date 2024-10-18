const username = document.querySelector('#username');
const email = document.querySelector('#email');
const password = document.querySelector('#password');
const signup = document.querySelector('#signup-form');
const login = document.querySelector('#login-form');

const emailLogin = document.querySelector("#email-login");
const passwordLogin = document.querySelector("#password-login");



signup.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ 
            username: username.value, 
            email: email.value, 
            password: password.value 
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to sign up.');
    }
   
});

login.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({
             email: emailLogin.value, 
             password: passwordLogin.value 
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to log in.');
    }
});