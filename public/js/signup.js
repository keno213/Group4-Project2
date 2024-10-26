const signupFormEl = document.querySelector("#signup-form");
const signupUsernameEl = document.querySelector("#signup-username");
const signupPasswordEl = document.querySelector("#signup-password");

signupFormEl.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = signupUsernameEl.value;
  const password = signupPasswordEl.value;

  try {
    const response = await fetch("/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("User created successfully!");
    window.location.href = "/search";
  } catch (error) {
    console.error(error);
    console.log("Failed to create user");
  }
});
