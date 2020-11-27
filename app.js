import express from 'express';
const app = express();

import productRoutes from "./api/routes/products.js";
import orderRoutes from "./api/routes/orders.js";
import morgan from "morgan";

app.use(morgan('dev'));

// Routes which should handle requests
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);



// fdsfsdf
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404
    next(error)
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.json({
        error: {
            message: err.message
        }
    })
})

export default app;
