//need to save the data var to localStorage
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
        //save results to local storage so other handlebars can use the data
        const savedSearchResults = JSON.stringify(data);
        localStorage.setItem("searchResults", savedSearchResults);
        //display the search results on the handlebar page
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

          // const addFavoriteBtn = document.createElement("button");
          // addFavoriteBtn.textContent = "Add to Favorites";
          // addFavoriteBtn.addEventListener("click", function () {
          //   document.location.replace("/favorites");
          // });
          // bookDivEl.appendChild(addFavoriteBtn);

          // favorite book toggle switch
          const favoriteSwitch = document.createElement("label");
          favoriteSwitch.className = "switch";
          const favoriteInput = document.createElement("input");
          favoriteInput.type = "checkbox";
          favoriteInput.id = "toggleSwitch";
          favoriteSwitch.appendChild(favoriteInput);
          const favoriteSpan = document.createElement("span");
          favoriteSpan.className = "slider round";
          favoriteSwitch.appendChild(favoriteSpan);
          bookDivEl.appendChild(favoriteSwitch);
          bookList.appendChild(bookDivEl);
        });
      });
  });

// JavaScript to log the toggle state
document.getElementById("toggleSwitch").addEventListener("change", function () {
  if (this.checked) {
    console.log("Favorite is ON");
    // Add code to update the database
    // fetch
  } else {
    console.log("Favorite is OFF");
    // Add code to update the database
  }
});
