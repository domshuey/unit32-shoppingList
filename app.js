const express = require('express');
const app = express();
const ExpressError = require('./middleware/expressError')
const itemRoutes = require('./routes/items')

app.use(express.json());
app.use('/items', itemRoutes);

app.use((req, res, next) => {
    return new ExpressError('Item not Found', 404)
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({ error: 
        { status: err.status, 
        message: err.message } 
    });
});

module.exports = app;