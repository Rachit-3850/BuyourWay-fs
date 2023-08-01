const mongoose = require('mongoose')

async function connectDatabase() {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection complete");
}
module.exports = connectDatabase