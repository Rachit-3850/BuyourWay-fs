const app = require('./app')
const connectDatabase = require('./config/database')

process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})   

const dotenv = require('dotenv')

dotenv.config({path: 'backend/config/config.env'})

connectDatabase(); 

const server = app.listen(process.env.PORT , () => {
    console.log(`server started on PORT: ${process.env.PORT} `)
})

process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})