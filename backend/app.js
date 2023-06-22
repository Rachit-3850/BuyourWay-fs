const express = require('express');
const app = express();
const errorMiddleware = require('./middlewares/error');
const cookieParser = require("cookie-parser")
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config({path: 'backend/config/config.env'})
app.use(
    cors({
        credentials: true,
        origin: "https://buyourway.onrender.com",
    })
);
// app.use(
//     cors({
//         credentials: true,
//         origin: "http://localhost:3000",
//     })
// );
// app.options('*', cors())

app.use(express.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload())

// app.use(function (req, res, next) {
//     // console.log(process.env.FRONT_URL);
//     res.setHeader("Access-Control-Allow-Origin", process.env.FRONT_URL);
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.setHeader("Access-Control-Allow-Credentials", true);
//     next();
// });


const products = require('./routes/product')
const auth = require('./routes/auth')
const order = require('./routes/order')


app.use('/api/v1' , products)
app.use('/api/v1' , auth)
app.use('/api/v1' , order)

app.use(errorMiddleware)

module.exports = app;