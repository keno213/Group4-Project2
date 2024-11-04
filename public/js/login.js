const loginForm = document.querySelector(".login-form");

const loginFormHandler = async (event) => {
  event.preventDefault();

  const emailElement = document.querySelector("#email");
  const passwordElement = document.querySelector("#password");

  const email = emailElement ? emailElement.value.trim() : "";
  const password = passwordElement ? passwordElement.value.trim() : "";

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to log in");
    }
  }
};

if (loginForm) {
  loginForm.addEventListener("submit", loginFormHandler);
}
