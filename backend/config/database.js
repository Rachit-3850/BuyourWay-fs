const mongoose = require('mongoose')

// const dotenv = require('dotenv')

// dotenv.config({path: 'config.env'})

async function connectDatabase() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection complete");
    // use await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test'); if your database has auth enabled
}
module.exports = connectDatabase