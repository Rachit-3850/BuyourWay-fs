const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('file-upload')

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload())


const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')


app.use('/api/v1' , products)
app.use('/api/v1' , auth)
app.use('/api/v1' , order)

app.use(errorMiddleware)

module.exports = app;