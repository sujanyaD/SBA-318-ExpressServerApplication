// routes/books.js
const express = require('express');
const fs= require('fs');
const router = express.Router();
const path = require('path');
const booksData = require('../data/books');
const booksFilePath = path.join(__dirname,'../data/books.json')

// Get all books usingGET
const getBooks = ()=>{
    const data = fs.readFileSync(booksFilePath);
    return JSON.parse(data);

};
// defining a route handler for  GET request to the route URL
router.get('/', (req, res) => {
       const books = getBooks();
    res.render('index',{books});
});


// Add a new book using POST
router.post('/', (req, res) => {
    const { title, author, price } = req.body;
    const newBook = {
        id: booksData.length + 1,
        title,
        author,
        price
    };
    booksData.push(newBook);
    res.status(201).json(newBook);
});

// Delete a book using DELETE
router.delete('/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const index = booksData.findIndex(book => book.id === bookId);
    if (index !== -1) {
        booksData.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Book not found');
    }
});

module.exports = router;
