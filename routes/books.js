// routes/books.js
const express = require('express');
const router = express.Router();
const booksData = require('../data/books');

// Get all books
router.get('/books', (req, res) => {
    res.json(booksData);
});


// Add a new book
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

// Delete a book
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
