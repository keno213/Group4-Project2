const reviewFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#review-title").value;
  const body = document.querySelector("#review-body").value;

  if (body) {
    const response = await fetch("/api/bookSearch/addReview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        body,
      }),
    });

    if (response.ok) {
      document.location.reload();
    } else {
      document.location.replace("/login");
    }
  }
};

document
  .querySelector("#add-review-form")
  .addEventListener("submit", reviewFormHandler);
