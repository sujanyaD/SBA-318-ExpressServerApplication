// middleware/logger.js
//used logger middleware funtion to log each incoming reuest.

const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url} - ${new Date()}`);
    next();
};

module.exports = loggerMiddleware;

