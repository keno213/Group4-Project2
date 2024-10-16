document.getElementById('search-book-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    try {
        let books = await fetch("https://localhost:3000/api/books/searchgoogle", {
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
    } catch (error) {
        console.log(error)
    }
});