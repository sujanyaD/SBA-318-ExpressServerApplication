
//creating node server
const express = require('express');
const app = express();
const PORT = 3000;

// starting server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });