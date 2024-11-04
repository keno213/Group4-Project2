const searchForm = document.querySelector("#search-form");
//fetch the form input
const searchFormHandler = async (event) => {
  event.preventDefault();

  const searchInputElement = document.querySelector("#search-input");
  const searchInput = searchInputElement ? searchInputElement.value.trim() : "";
  const resultsContainer = document.querySelector("#search-results");

  if (searchInput) {
    const response = await fetch(
      `/api/books/search/${encodeURIComponent(searchInput)}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (response.ok) {
      const data = await response.json();
      displaySearchResults(data.items, resultsContainer);
    } else {
      alert("Failed to search books");
    }
  }
};
// display search results
const displaySearchResults = (books, container) => {
  container.innerHTML = "";

  books.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.className = "book-card";

    const imageLink =
      book.volumeInfo.imageLinks?.thumbnail || "/images/default-book.png";
    const authors = book.volumeInfo.authors?.join(", ") || "Unknown Author";

    bookElement.innerHTML = `
      <img src="${imageLink}" alt="${book.volumeInfo.title} cover">
      <h4>${book.volumeInfo.title}</h4>
      <p>By: ${authors}</p>
      <button class="favorite-btn" data-book='${JSON.stringify({
        google_books_id: book.id,
        title: book.volumeInfo.title,
        authors: authors,
        description: book.volumeInfo.description || "",
        image_link: imageLink,
      })}'>Add to Favorites</button>
    `;

    container.appendChild(bookElement);
  });

  addFavoriteEventListeners();
};
// favorite button
const addFavoriteEventListeners = () => {
  document.querySelectorAll(".favorite-btn").forEach((button) => {
    button.addEventListener("click", async (event) => {
      const target = event.target;
      if (!target) return;
      const bookData = JSON.parse(target.dataset.book);

      try {
        // First save/find the book in our database
        const bookResponse = await fetch("/api/books", {
          method: "POST",
          body: JSON.stringify(bookData),
          headers: { "Content-Type": "application/json" },
        });

        if (bookResponse.ok) {
          const book = await bookResponse.json();

          // Then add it to user's favorites
          const favoriteResponse = await fetch("/api/favorites", {
            method: "POST",
            body: JSON.stringify({ book_id: book.id }),
            headers: { "Content-Type": "application/json" },
          });

          if (favoriteResponse.ok) {
            alert("Book added to favorites!");
          } else {
            throw new Error("Failed to add to favorites");
          }
        } else {
          throw new Error("Failed to save book");
        }
      } catch (err) {
        alert(err.message);
      }
    });
  });
};

if (searchForm) {
  searchForm.addEventListener("submit", searchFormHandler);
}
