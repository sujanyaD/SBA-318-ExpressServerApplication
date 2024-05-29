// middleware/logger.js
//used logger middleware funtion to log each incoming reuest.

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next();
};

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
  };

  module.exports = { loggerMiddleware, errorHandler };

