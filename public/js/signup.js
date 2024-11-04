const signupForm = document.querySelector(".signup-form");

const signupFormHandler = async (event) => {
  event.preventDefault();

  const usernameElement = document.querySelector("#username");
  const emailElement = document.querySelector("#email");
  const passwordElement = document.querySelector("#password");

  const username = usernameElement ? usernameElement.value.trim() : "";
  const email = emailElement ? emailElement.value.trim() : "";
  const password = passwordElement ? passwordElement.value.trim() : "";

  if (username && email && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Failed to sign up");
    }
  }
};

if (signupForm) {
  signupForm.addEventListener("submit", signupFormHandler);
}
