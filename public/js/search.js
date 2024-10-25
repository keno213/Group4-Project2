const searchFormEl = document.querySelector("#search-form");
const searchInputEl = document.querySelector("#search-input");
const favoriteFormEl = document.querySelector("#favorite-form");
const favBookIdEl = document.querySelector("#fav-book-id");
const favBookTitleEl = document.querySelector("#fav-book-title");
const reviewFormEl = document.querySelector("#review-form");
const reviewBookIdEl = document.querySelector("#review-book-id");
const reviewTextareaEl = document.querySelector("#review-textarea");
// this works
if (searchFormEl) {
  searchFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const searchQuery = searchInputEl.value;
      const searchPost = await fetch("/search");
    } catch (error) {
      console.error(error);
    }
  });
}

if (favoriteFormEl) {
  favoriteFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const bookId = favBookIdEl.value;
      const bookTitle = favBookTitleEl.value;
      const favoriteResults = await fetch("/books/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, bookTitle }),
      });
      if (favoriteResults.ok) {
        console.log("Favorite added successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  });
}

if (reviewFormEl) {
  reviewFormEl.addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      const bookId = reviewBookIdEl.value;
      const review = reviewTextareaEl.value;
      const reviewResults = await fetch("/books/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, review }),
      });
      if (reviewResults.ok) {
        console.log("Review added successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  });
}
