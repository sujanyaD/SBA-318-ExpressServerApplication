// server/index.js
const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const path = require('path');
const PORT = 5050;
const booksRouter = require('./routes/books');
const { loggerMiddleware, errorHandler } = require('./middleware/logger'); // Import middleware functions


// Setting  EJS as the view engine
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
 app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 app.use(loggerMiddleware);
 app.use(errorHandler);

// Routes for View 
app.use('/api/books', booksRouter);
app.use('/api/v1',booksRouter);

const error = require("./utilities/error");

//set view engine ejs as our template engine
// app.set("view engine", "ejs");

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });
//Home Route
  app.get('/',(req,res)=>{
    res.redirect('/books');
  });
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

