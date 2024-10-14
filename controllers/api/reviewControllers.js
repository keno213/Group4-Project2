const express = require('express');
const Review = require('../models/reviewModel'); // Assuming you have a Review model

const router = express.Router();

// Get all reviews
router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find();
        res.json(reviews);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single review by ID
router.get('/:id', getReview, (req, res) => {
    res.json(res.review);
});

// Create a new review
router.post('/', async (req, res) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        rating: req.body.rating
    });

    try {
        const newReview = await review.save();
        res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a review
router.patch('/:id', getReview, async (req, res) => {
    if (req.body.title != null) {
        res.review.title = req.body.title;
    }
    if (req.body.content != null) {
        res.review.content = req.body.content;
    }
    if (req.body.rating != null) {
        res.review.rating = req.body.rating;
    }

    try {
        const updatedReview = await res.review.save();
        res.json(updatedReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a review
router.delete('/:id', getReview, async (req, res) => {
    try {
        await res.review.remove();
        res.json({ message: 'Deleted Review' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get a review by ID
async function getReview(req, res, next) {
    let review;
    try {
        review = await Review.findById(req.params.id);
        if (review == null) {
            return res.status(404).json({ message: 'Cannot find review' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.review = review;
    next();
}

module.exports = router;