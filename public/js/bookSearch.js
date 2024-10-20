document
  .querySelector("#search-book-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const searchTerm = document.querySelector("#search-query").value;
    fetch("/bookSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchTerm }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const bookList = document.querySelector("#book-search-results");
        bookList.textContent = "";
        data.items.forEach((book) => {
          const bookDivEl = document.createElement("div");

          const titleEl = document.createElement("h2");
          titleEl.textContent = book.volumeInfo.title;
          bookDivEl.appendChild(titleEl);

          const authorEl = document.createElement("h3");
          authorEl.textContent = book.volumeInfo.authors;
          bookDivEl.appendChild(authorEl);

          const descriptionEl = document.createElement("p");
          descriptionEl.textContent = book.volumeInfo.description;
          bookDivEl.appendChild(descriptionEl);

          const imageEl = document.createElement("img");
          imageEl.src = book.volumeInfo.imageLinks.thumbnail;
          imageEl.alt = book.volumeInfo.title;
          bookDivEl.appendChild(imageEl);

          const addReviewBtn = document.createElement("button");
          addReviewBtn.textContent = "Add a Review";
          addReviewBtn.addEventListener("click", function () {
            document.location.replace("/bookSearch/addReview");
          });
          bookDivEl.appendChild(addReviewBtn);

          const addFavoriteBtn = document.createElement("button");
          addFavoriteBtn.textContent = "Add to Favorites";
          addFavoriteBtn.addEventListener("click", function () {
            document.location.replace("/favorites");
          });
          bookDivEl.appendChild(addFavoriteBtn);

          bookList.appendChild(bookDivEl);
        });
      });
  });
