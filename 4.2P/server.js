const express = require('express');
const mongoose = require('mongoose');
const Book = require('./models/Book');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookshelfDB';

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1. Connect to MongoDB
mongoose.connect(mongoUri)
  .catch((err) => console.error('Could not connect to MongoDB:', err.message));
mongoose.connection.on('connected', () => console.log('Connected to MongoDB (bookshelfDB)'));

// 2. GET all books from the database (optional filter: /api/books?genre=Fiction)
app.get('/api/books', async (req, res) => {
  try {
    const filter = {};
    if (req.query.genre) filter.genre = String(req.query.genre);
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json({ statusCode: 200, data: books, message: 'Success' });
  } catch (err) {
    res.status(500).json({ statusCode: 500, message: 'Could not load books' });
  }
});

// 3. GET the list of allowed genres (used to build the form dropdown)
app.get('/api/genres', (req, res) => {
  res.json({ statusCode: 200, data: Book.GENRES, message: 'Success' });
});

// 4. POST a new book: only accept the fields we expect, then let the schema validate them
app.post('/api/books', async (req, res) => {
  try {
    const { title, author, genre, publishedYear, rating, summary } = req.body;
    const book = new Book({ title, author, genre, publishedYear, rating, summary });
    await book.save();
    res.status(201).json({ statusCode: 201, data: book, message: 'Book added successfully' });
  } catch (err) {
    res.status(400).json({ statusCode: 400, message: err.message });
  }
});

// 5. Start server
app.listen(port, () => {
  console.log('Bookshelf app listening on http://localhost:' + port);
});
