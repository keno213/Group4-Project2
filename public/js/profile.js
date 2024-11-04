document.querySelectorAll(".review-btn").forEach((button) => {
  button.addEventListener("click", async (event) => {
    const target = event.target;
    if (!target) return;
    const bookId = target.dataset.id;
    const content = prompt("Write your review:");
    const rating = parseInt(prompt("Rate from 1-5:"));

    if (content && rating && rating >= 1 && rating <= 5) {
      try {
        const response = await fetch("/api/reviews", {
          method: "POST",
          body: JSON.stringify({
            content,
            rating,
            book_id: bookId,
          }),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          location.reload();
        } else {
          throw new Error("Failed to post review");
        }
      } catch (err) {
        alert(err.message);
      }
    }
  });
});
