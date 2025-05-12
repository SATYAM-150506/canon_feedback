const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, required: true },
    product_model: { type: String, required: true },
    comments: { type: String, required: true },
    satisfaction: { type: String, required: true }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;