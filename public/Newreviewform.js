document.getElementById('new-review-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const bookTitle = document.getElementById('book-title').value;
    const reviewContent = document.getElementById('review-content').value;
    const rating = document.getElementById('rating').value;
  
    // Fetch book information from Google Books API
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${bookTitle}`);
    const data = await response.json();
  
    if (data.totalItems > 0) {
      const book = data.items[0].volumeInfo;
      const bookInfo = {
        title: book.title,
        authors: book.authors,
        description: book.description,
        thumbnail: book.imageLinks ? book.imageLinks.thumbnail : ''
      };
  
      // Display book information
      document.getElementById('book-results').innerHTML = `
        <h2>Book Information</h2>
        <p><strong>Title:</strong> ${bookInfo.title}</p>
        <p><strong>Authors:</strong> ${bookInfo.authors.join(', ')}</p>
        <p><strong>Description:</strong> ${bookInfo.description}</p>
        <img src="${bookInfo.thumbnail}" alt="Book Thumbnail">
      `;
  
      // Send review data to the server
      const reviewResponse = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          bookTitle: bookInfo.title,
          reviewContent,
          rating
        })
      });
  
      if (reviewResponse.ok) {
        alert('Review submitted successfully!');
      } else {
        alert('Failed to submit review.');
      }
    } else {
      alert('No books found with that title.');
    }
  });