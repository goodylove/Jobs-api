const express = require('express');

require("dotenv").config()


require("express-async-errors")

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')



const app = express();

// routes

const authRoute = require('./routes/auth')

const jobRoute = require('./routes/jobs')



// middleware
const notFound = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler');

const connectDB = require('./db/connectdb');
const authenticatedUser = require("./middleware/auth")



app.use(rateLimiter(
    {
        windowMs: 15 * 60 * 1000, // 15 minutes
        limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
        standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
        // store: ... , // Redis, Memcached, etc. See below.
    }

))

app.use(express.json());
app.use(helmet())
app.use(cors())
app.use(xss());


app.use("/api/v1/auth",authRoute)

app.use("/api/v1/jobs",authenticatedUser,jobRoute)


app.use(notFound)
app.use(errorHandler)


const Port = process.env.PORT || 8000


const start = async()=>{
   try {
    await connectDB(process.env.MONGO_URL)
    app.listen(Port, () => {
        console.log(`Server is running on port ${Port}`)
    })
    
   } catch (error) {
    
    console.log(error)
   }
}
start()