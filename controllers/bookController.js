// controllers/bookController.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const { Library } = require('../models');

// Fetch a book from Google Books API and save it to user's library
router.post('/library/add', async (req, res) => {
  const { googleBookId, title, author, description, thumbnail } = req.body;
  const userId = req.session.userId;

  try {
    // Check if the book is already in the user's library
    const existingBook = await Library.findOne({ where: { googleBookId, userId } });

    if (!existingBook) {
      // Create a new entry in the library for this user
      const newLibraryEntry = await Library.create({
        googleBookId,
        title,
        author,
        description,
        thumbnail,
        userId
      });

      res.json(newLibraryEntry);
    } else {
      res.status(400).json({ message: 'Book is already in your library.' });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add book to library' });
  }
});
