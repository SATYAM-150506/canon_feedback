const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedbackModel');
// Get all feedback entries
router.get('/feedback', async (req, res) => {
    try {
        const { satisfaction, product_model, sort } = req.query;

        // Build filter criteria dynamically
        let filter = {};
        if (satisfaction) filter.satisfaction = satisfaction;
        if (product_model) filter.product_model = product_model;

        // Define sorting options
        let sortOptions = {};
        if (sort === 'date_asc') sortOptions.date = 1;
        if (sort === 'date_desc') sortOptions.date = -1;

        // Retrieve filtered and sorted feedback from the database
        const feedbacks = await Feedback.find(filter).sort(sortOptions).lean();
        res.render('feedback', { feedbacks });
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving feedback' });
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
        res.status(500).send({ message: 'Error retrieving feedback details' });
    }
});

// Add a feedback entry
router.post('/submit_feedback', async (req, res) => {
    try {
        const { name, email, date, product_model, comments, satisfaction } = req.body;
        
        const newFeedback = new Feedback({
            name,
            email,
            date,
            product_model,
            comments,
            satisfaction
        });

        await newFeedback.save(); // Saves feedback in MongoDB
        sendAcknowledgmentEmail(email, name);
        res.redirect('/feedback'); // Redirect to feedback page after submission
    } catch (error) {
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
        res.status(500).send({ message: 'Error deleting feedback' });
    }
});

module.exports = router;