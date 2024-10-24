const loginFormEl = document.querySelector("#login-form");
const loginUsernameEl = document.querySelector("#login-username");
const loginPasswordEl = document.querySelector("#login-password");

loginFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = loginUsernameEl.value;
  const password = loginPasswordEl.value;
  try {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      window.location.replace("/search");
    } else {
      console.error("Login failed");
    }
  } catch (error) {
    console.error(error);
  }
});
