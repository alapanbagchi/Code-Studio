import express from 'express'
import mongoose from 'mongoose'
import session from 'express-session'
import { createClient } from 'redis'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cors from 'cors'
import http from 'http'
import fs from 'fs'
import https from 'https'
import dotenv from 'dotenv'
require('./utils/passport')

dotenv.config()
const RedisStore = require('connect-redis')(session)
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.CLIENT_URL.split(','),
    credentials: true
}))
// Redis client setup
const redisClient = createClient({
    legacyMode: true,
    url: process.env.REDIS_URI
})
app.use(cookieParser())
if (!process.env.SESSION_SECRET) throw new Error('No session secret provided')
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 30, secure: true, sameSite: 'none' },
    resave: false,
    store: new RedisStore({
        client: redisClient
    })
}))
app.use(passport.authenticate('session'))

app.get('/', (req, res) => {
    res.status(200).json({ type: "SUCCESS", message: "Welcome to code studio backend" })
})


app.use('/user', require('./routes/user.router'))
app.use('/problems', require('./routes/problem.router'))
app.use('/test', require('./routes/test.router'))


const startServer = async () => {
    // > Connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log('✅ | Connected to MongoDB')
    } catch (err) {
        console.log("❌ | Could not connect to MongoDB")
        process.exit(0)
    }
    // > Connect to Redis
    try {
        await redisClient.connect()
        redisClient.on('error', (err) => {
            console.log(err)
        })
        console.log('✅ | Connected to Redis')
    } catch (err) {
        console.log("❌ | Could not connect to Redis")
        process.exit(0)
    }
    // > Start server. If its not in production, start with local certificates with https protocol
    if (process.env.ENVIRONMENT === 'PRODUCTION') {
        let server = http.createServer(app)
        server.listen(PORT, () => {
            console.log(`✅ | Server started on port with http ${PORT}`)
        })
    } else {
        const options = {
            key: fs.readFileSync('src/key.pem'),
            cert: fs.readFileSync('src/cert.pem')
        }
        let server = https.createServer(options, app)
        server.listen(PORT, () => {
            console.log(`✅ | Server started on port with https ${PORT}`)
        })
    }
}

startServer()

export {
    redisClient
}
