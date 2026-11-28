# SIT725 4.2P – Add a Database (My Bookshelf)

Builds on 3.2P: the book data now lives in **MongoDB** (via **Mongoose**) instead of an array in `server.js`,
and adding a book is handled on the server.

## Structure
```
4.2P/
├── server.js        # Express server, MongoDB connection, REST API
├── models/Book.js   # Mongoose schema + validation for a book
├── seed.js          # puts 4 sample books into the database
├── package.json
└── public/          # Materialize client (index.html, css, js, images)
```

## Book fields
| Field | Type | Rules |
| --- | --- | --- |
| title | String | required, 2–100 chars |
| author | String | required, 2–60 chars |
| genre | String | one of Fiction, Self-help, Science Fiction, Technology, Biography, Fantasy |
| publishedYear | Number | 1450 – current year |
| rating | Number | 1–5 |
| coverImage | String | defaults to `images/default.svg` |
| summary | String | required, max 300 chars |

## Run
Needs MongoDB running locally on `mongodb://127.0.0.1:27017`.
```
cd 4.2P
npm install
npm run seed     # adds the sample books to bookshelfDB
npm start
```
Open http://localhost:3000

## API
| Method | Route | What it does |
| --- | --- | --- |
| GET | `/api/books` | all books from MongoDB (`?genre=Fiction` to filter) |
| GET | `/api/genres` | list of allowed genres |
| POST | `/api/books` | validates and saves a new book |

Check the data: `mongosh` → `use bookshelfDB` → `db.books.find().pretty()`, or open MongoDB Compass at `mongodb://localhost:27017`.
