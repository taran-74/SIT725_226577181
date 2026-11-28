// Fills the database with sample books. Run with: npm run seed
const mongoose = require('mongoose');
const Book = require('./models/Book');

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/bookshelfDB';

const sampleBooks = [
  {
    title: 'The Midnight Library', author: 'Matt Haig', genre: 'Fiction',
    publishedYear: 2020, rating: 4, coverImage: 'images/book1.svg',
    summary: 'Between life and death there is a library, and every book offers a chance to try a different life.'
  },
  {
    title: 'Atomic Habits', author: 'James Clear', genre: 'Self-help',
    publishedYear: 2018, rating: 5, coverImage: 'images/book2.svg',
    summary: 'A practical guide to building good habits and breaking bad ones through tiny, 1% improvements.'
  },
  {
    title: 'Project Hail Mary', author: 'Andy Weir', genre: 'Science Fiction',
    publishedYear: 2021, rating: 5, coverImage: 'images/book3.svg',
    summary: 'A lone astronaut wakes up on a spaceship with no memory and must save humanity using science.'
  },
  {
    title: 'Clean Code', author: 'Robert C. Martin', genre: 'Technology',
    publishedYear: 2008, rating: 4, coverImage: 'images/book4.svg',
    summary: 'A handbook of agile software craftsmanship: how to write code that is readable and maintainable.'
  }
];

async function seed() {
  try {
    await mongoose.connect(mongoUri);
    await Book.deleteMany({});            // start fresh each time
    const saved = await Book.insertMany(sampleBooks);
    console.log(saved.length + ' sample books saved to bookshelfDB!');
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
