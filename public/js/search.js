async function searchBooks() {
  const query = document.getElementById("search-query").value;
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = ""; // Clear previous results

  if (!query) {
    alert("Please enter a search term!");
    return;
  }

  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}`
    );
    const data = await response.json();
    console.log("Fetch books returnes")

    if (data.totalItems === 0) {
      bookList.innerHTML = "No results found.";
      return;
    }

    data.items.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("book");

      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.volumeInfo.title;
      bookItem.appendChild(bookTitle);

      if (book.volumeInfo.imageLinks) {
        const bookImage = document.createElement("img");
        bookImage.src = book.volumeInfo.imageLinks.thumbnail;
        bookItem.appendChild(bookImage);
      }

      const bookAuthors = document.createElement("p");
      bookAuthors.textContent = `Authors: ${
        book.volumeInfo.authors?.join(", ") || "Unknown"
      }`;
      bookItem.appendChild(bookAuthors);

      const bookDescription = document.createElement("p");
      bookDescription.textContent =
        book.volumeInfo.description ?
          book.volumeInfo.description.substring(0, 100) + "..."
        : "No description available.";
      bookItem.appendChild(bookDescription);

      bookList.appendChild(bookItem);
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    bookList.innerHTML = "Error fetching books. Please try again later.";
  }
}
