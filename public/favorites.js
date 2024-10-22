
fetch("/api/books/favorites")
.then(res => res.json())
.then(bookdata => {
    console.log(bookdata);

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
    
    
        bookContainer.appendChild(title);
        bookContainer.appendChild(author);
        bookContainer.appendChild(description);
        bookContainer.appendChild(bookImage);
    
        document.getElementById('favorites').appendChild(bookContainer);
    
    }
});

