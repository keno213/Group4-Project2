document.getElementById('search-book-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        let books = await fetch("http://localhost:3000/api/books/searchgoogle", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                searchterm: document.getElementById('search-term').value
            })  
        })
        let bookdata = await books.json()
        console.log(bookdata)

        for (i = 0; i < bookdata.length; i++) {
            const book = bookdata[i];

            const bookContainer = document.createElement('div');
            bookContainer.classList.add('book-container');

            const title = document.createElement('h1');
            title.textContent = book.volumeInfo.title;

            const author = document.createElement('h2');
            author.textContent = book.volumeInfo.authors;

            const description = document.createElement('p');
            description.textContent = book.volumeInfo.description;

            const bookImage = document.createElement('div');
            bookImage.classList.add('book-image');
            bookImage.style.backgroundImage = `url(${book.volumeInfo.imageLinks.thumbnail})`;


            // ADD TWO BUTTONS: ADDING TO FAVORITES AND ADD A REVIEW
            const addFavorite = document.createElement('button');
            addFavorite.textContent = "Add to Favorites";
            addFavorite.addEventListener('click', async (event) => {
                // SEND A POST REQUEST TO ADD THE BOOK'S ID TO THE USER DATA
                fetch("/api/books/addbook", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        book: book
                    })
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                })
            })

            const addReview = document.createElement('button');
            addReview.textContent = "Add a Review";
            addReview.addEventListener('click', async (event) => {
                window.location.href = '/newreview';
            })

            bookContainer.appendChild(addFavorite);
            bookContainer.appendChild(addReview);


            bookContainer.appendChild(title);
            bookContainer.appendChild(author);
            bookContainer.appendChild(description);
            bookContainer.appendChild(bookImage);

            document.getElementById('search-results').appendChild(bookContainer);

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
        console.log(error)
    }
});