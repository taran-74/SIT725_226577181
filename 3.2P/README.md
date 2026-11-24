# SIT725 3.2P – Getting Graphical (My Bookshelf)

A small web app built with **Express** (server) and **Materialize** (client UI).
The kitten/cards demo from the practical has been replaced with a **books** domain.

## Structure
```
3.2P/
├── server.js          # Express server + GET /api/books
├── package.json
└── public/
    ├── index.html     # Materialize page (navbar, header, cards, modal form, footer)
    ├── css/style.css
    ├── js/scripts.js  # calls /api/books with jQuery and renders cards
    └── images/        # book cover images (book1–4.svg)
```

## Run
```
cd 3.2P
npm install
npm start
```
Then open http://localhost:3000

## API
`GET /api/books` returns:
```json
{ "statusCode": 200, "data": [ { "title": "...", "author": "...", "image": "...", "link": "...", "description": "..." } ], "message": "Success" }
```
