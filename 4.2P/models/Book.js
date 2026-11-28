const mongoose = require('mongoose');

const GENRES = ['Fiction', 'Self-help', 'Science Fiction', 'Technology', 'Biography', 'Fantasy'];

// Book schema: our own fields (different from the prac's title/image/link/description)
const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 100 },
    author: { type: String, required: true, trim: true, minlength: 2, maxlength: 60 },
    genre: { type: String, required: true, enum: GENRES },
    publishedYear: { type: Number, required: true, min: 1450, max: new Date().getFullYear() },
    rating: { type: Number, required: true, min: 1, max: 5 },
    coverImage: { type: String, default: 'images/default.svg' },
    summary: { type: String, required: true, trim: true, maxlength: 300 }
  },
  { timestamps: true } // adds createdAt / updatedAt
);

module.exports = mongoose.model('Book', BookSchema);
module.exports.GENRES = GENRES;
