const reviewFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#review-title").value;
  const body = document.querySelector("#review-body").value;

  if (body && title) {
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
  } else {
    if (!title) {
      alert("Please enter a title for your review.");
    } else {
      alert("Please enter a review.");
    }
  }

  // this reloads the addReview.handlebars
  // document.location.reload();
  fetch("/bookSearch/getReviews", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      response.json();
    })
    .then((data) => {
      // all the reviews
      console.log(data);
      // empty the form inputs
      document.querySelector("#review-title").value = "";
      document.querySelector("#review-body").value = "";
    });
};

document
  .querySelector("#add-review-form")
  .addEventListener("submit", reviewFormHandler);

const searchResult = JSON.parse(localStorage.getItem("searchResults")) || [
  "no books in local storage",
];
//console.log(searchResult);
