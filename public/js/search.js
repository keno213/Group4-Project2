// async function searchBooks() {
//   const query = document.getElementById("search-query").value;
//   const bookList = document.getElementById("book-list");
//   bookList.innerHTML = ""; // Clear previous results

//   if (!query) {
//     alert("Please enter a search term!");
//     return;
//   }

//   try {
//     const response = await fetch(
//       `https://www.googleapis.com/books/v1/volumes?q=${query}`
//     );
//     const data = await response.json();
//     console.log("Fetch books returns")

//     if (data.totalItems === 0) {
//       bookList.innerHTML = "No results found.";
//       return;
//     }

//     data.items.forEach((book) => {
//       const bookItem = document.createElement("div");
//       bookItem.classList.add("book");

//       const bookTitle = document.createElement("h3");
//       bookTitle.textContent = book.volumeInfo.title;
//       bookItem.appendChild(bookTitle);

//       if (book.volumeInfo.imageLinks) {
//         const bookImage = document.createElement("img");
//         bookImage.src = book.volumeInfo.imageLinks.thumbnail;
//         bookItem.appendChild(bookImage);
//       }

//       const bookAuthors = document.createElement("p");
//       bookAuthors.textContent = `Authors: ${
//         book.volumeInfo.authors?.join(", ") || "Unknown"
//       }`;
//       bookItem.appendChild(bookAuthors);

//       const bookDescription = document.createElement("p");
//       bookDescription.textContent =
//         book.volumeInfo.description ?
//           book.volumeInfo.description.substring(0, 100) + "..."
//         : "No description available.";
//       bookItem.appendChild(bookDescription);

//       bookList.appendChild(bookItem);
//     });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     bookList.innerHTML = "Error fetching books. Please try again later.";
//   }
// }
document
  .getElementById("search-book-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    try {
      let books = await fetch("http://localhost:3000/bookSearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          searchterm: document.getElementById("search-query").value,
        }),
      });
      let bookdata = await books.json();
      console.log(bookdata);

      for (var i = 0; i < bookdata.length; i++) {
        const book = bookdata[i];

        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book-container");

        const title = document.createElement("h1");
        title.textContent = book.volumeInfo.title;

        const author = document.createElement("h2");
        author.textContent = book.volumeInfo.authors;

        const description = document.createElement("p");
        description.textContent = book.volumeInfo.description;

        const bookImage = document.createElement("div");
        bookImage.classList.add("book-image");
        bookImage.style.backgroundImage = `url(${book.volumeInfo.imageLinks.thumbnail})`;

        // ADD TWO BUTTONS: ADDING TO FAVORITES AND ADD A REVIEW
        const addFavorite = document.createElement("button");
        addFavorite.textContent = "Add to Favorites";
        addFavorite.addEventListener("click", async (event) => {
          // SEND A POST REQUEST TO ADD THE BOOK'S ID TO THE USER DATA
          // console.log("Adding to favorites");
          // console.log(book.id);
          try {
            let res = await fetch("/api/favBooks/addBook", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                bookId: book.id,
              }),
            });
            let data = await res.json();
            console.log(data);
          } catch (error) {
            console.log(error);
          }
        });

        const addReview = document.createElement("button");
        addReview.textContent = "Add a Review";
        addReview.addEventListener("click", async (event) => {
          window.location.href = "/newReview";
        });

        bookContainer.appendChild(addFavorite);
        bookContainer.appendChild(addReview);

        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(description);
        bookContainer.appendChild(bookImage);

        document.getElementById("search-results").appendChild(bookContainer);

        // <div class="book-container">
        //     <h1>Title</h1>
        //     <h2>Author</h2>
        //     <p>Description</p>
        //     <div class="book-image"
        //         style="background-image: url(https://placehold.co/400x600)"
        //     ></div>
        // </div>
      }
    } catch (error) {
      console.log(error);
    }
  });

// {
/* <form id="search-book-form">
  <input type="text" name="search" placeholder="Search for a book" id="search-term">
  <button type="submit">Search</button>
</form>
<div class="search-results" id="search-results"></div>
<script src="search-google.js"></script> */
// }
