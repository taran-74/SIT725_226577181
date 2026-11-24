const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Serve the client files (HTML, CSS, JS, images) from /public
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Our data: a list of books (replaces the kitten cards from the practical)
const bookList = [
  {
    title: 'The Midnight Library',
    author: 'Matt Haig',
    image: 'images/book1.svg',
    link: 'About The Midnight Library',
    description: 'Between life and death there is a library, and every book offers a chance to try a different life.'
  },
  {
    title: 'Atomic Habits',
    author: 'James Clear',
    image: 'images/book2.svg',
    link: 'About Atomic Habits',
    description: 'A practical guide to building good habits and breaking bad ones through tiny, 1% improvements.'
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    image: 'images/book3.svg',
    link: 'About Project Hail Mary',
    description: 'A lone astronaut wakes up on a spaceship with no memory and must save humanity using science.'
  },
  {
    title: 'Clean Code',
    author: 'Robert C. Martin',
    image: 'images/book4.svg',
    link: 'About Clean Code',
    description: 'A handbook of agile software craftsmanship: how to write code that is readable and maintainable.'
  }
];

// Simple GET REST endpoint consumed by the client
app.get('/api/books', (req, res) => {
  res.json({ statusCode: 200, data: bookList, message: 'Success' });
});

app.listen(port, () => {
  console.log('Bookshelf app listening on http://localhost:' + port);
});
