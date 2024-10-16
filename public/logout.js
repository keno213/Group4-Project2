const logout = document.querySelector("#logout-link")

logout.addEventListener('click', async (event) => {

    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('/login');
    } else {
        alert('Failed to log in.');
    }
});