const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    date: { type: Date, required: true, default: Date.now },
    product_model: { type: String, required: true, trim: true },
    comments: { type: String, required: true, trim: true, maxlength: 500 },
    satisfaction: { 
        type: String, 
        required: true, 
        enum: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied", "Very Dissatisfied"] 
    },
    rating: { type: Number, required: false, default: 0 } // Added rating field
}, { timestamps: true });

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;