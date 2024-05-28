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
// Filterning books By ID
router.get('/:id',(req,res)=>{
    const books = getBooks();
    const book = books.find(b=>b.id==req.params.id);
    if(book){
        res.json(book); //getting JSON data
    }
    else{
        res.status(404).json({message: 'Book not found'});
    }
})
// Add new book By POST Method
router.post('/add', (req, res) => {
    const books = getBooks();
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        description: req.body.description
    };
    books.push(newBook);
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
    res.redirect('/api/books');
});

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
// Delete a book using DELETE Method
router.post('/delete/:id', (req, res) => {
    let books = getBooks();
    books = books.filter(b => b.id != req.params.id);
    fs.writeFileSync(booksFilePath, JSON.stringify(books, null, 2));
    res.redirect('/api/books');
});


module.exports = router;
