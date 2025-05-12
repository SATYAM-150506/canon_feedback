const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');


// Get all feedback entries with filtering, sorting, and pagination
router.get('/feedback', async (req, res) => {
    try {
        const { satisfaction, product_model, sort, page = 1, limit = 10 } = req.query;

        // Build filter criteria dynamically
        let filter = {};
        if (satisfaction) filter.satisfaction = satisfaction;
        if (product_model) filter.product_model = new RegExp(product_model, 'i'); // Case-insensitive search

        // Define sorting options
        let sortOptions = {};
        if (sort === 'date_asc') sortOptions.date = 1;
        if (sort === 'date_desc') sortOptions.date = -1;

        // Paginate results
        const feedbacks = await Feedback.find(filter)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .lean();

        const totalFeedbacks = await Feedback.countDocuments(filter);
        const totalPages = Math.ceil(totalFeedbacks / limit);

        res.render('feedback', { feedbacks, currentPage: page, totalPages });
    } catch (error) {
        console.error('Error retrieving feedback:', error);
        res.status(500).send({ message: 'Error retrieving feedback entries' });
    }
});

// Get a single feedback entry
router.get('/feedback/details/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).lean();
        if (feedback) {
            res.render('feedbackDetail', { feedback });
        } else {
            res.status(404).send({ message: 'Feedback entry not found' });
        }
    } catch (error) {
        console.error('Error retrieving feedback details:', error);
        res.status(500).send({ message: 'Error retrieving feedback details' });
    }
});

// Add a feedback entry and send acknowledgment email
router.post('/submit_feedback', async (req, res) => {
    try {
        const { name, email, date, product_model, comments, satisfaction, rating } = req.body;

        const newFeedback = new Feedback({
            name,
            email,
            date,
            product_model,
            comments,
            satisfaction,
            rating: rating ? parseInt(rating) : 1
        });

        await newFeedback.save();
        res.redirect('/feedback');
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).send({ message: 'Error submitting feedback' });
    }
});

// Update a feedback entry
router.post('/update_feedback/:id', async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (updatedFeedback) {
            res.redirect('/feedback');
        } else {
            res.status(404).send({ message: 'Feedback entry not found' });
        }
    } catch (error) {
        console.error('Error updating feedback:', error);
        res.status(500).send({ message: 'Error updating feedback' });
    }
});

// Delete a feedback entry
router.post('/delete_feedback/:id', async (req, res) => {
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(req.params.id);
        if (deletedFeedback) {
            res.redirect('/feedback');
        } else {
            res.status(404).send({ message: 'Feedback entry not found' });
        }
    } catch (error) {
        console.error('Error deleting feedback:', error);
        res.status(500).send({ message: 'Error deleting feedback' });
    }
});

module.exports = router;