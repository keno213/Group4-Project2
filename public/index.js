const username = queryselector('#username');
const email = queryselector('#email');
const password = queryselector('#password');
const signup = queryselector('#signup-form');
const login = queryselector('#login-form');



signup.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username: username, email: email.value, password: password.value }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to sign up.');
    }
    res.status(200).json(response);
});

// login.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const response = await fetch('/api/users/login', {
//         method: 'POST',
//         body: JSON.stringify({ email: email.value, password: password.value }),
//         headers: { 'Content-Type': 'application/json' },
//     });
//     if (response.ok) {
//         document.location.replace('/dashboard');
//     } else {
//         alert('Failed to log in.');
//     }
// });