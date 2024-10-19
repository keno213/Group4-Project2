const logout = async () => {
  const response = await fetch("/api/users/logout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  console.log("backend response recieved on the front end");
  if (response.ok) {
    document.location.replace("/");
  } else {
    alert(response.statusText);
  }
};
if (document.querySelector("#logout")) {
  document.querySelector("#logout").addEventListener("click", logout);
}
