const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config({path: 'backend/config/config.env'})


app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload())



const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')


app.use('/api/v1' , products)
app.use('/api/v1' , auth)
app.use('/api/v1' , order)

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});

app.use(errorMiddleware)

module.exports = app;