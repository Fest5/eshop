import path from 'path'
import express from 'express'
import dotenv  from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'
import helmet from 'helmet'
import cors from 'cors'
import rateLimit from 'express-rate-limit'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import hpp from 'hpp'

import productRoutes from './routes/productsRoute.js'
import userRoutes from './routes/usersRoute.js'
import orderRoutes from './routes/ordersRoute.js'
import uploadRoutes from './routes/uploadRoute.js'

dotenv.config()

connectDB()

const app = express()

/* if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
 */
app.use(cors())
// Access-Control-Allow-Origin = *

app.options('*', cors())

app.use(helmet())

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
  });
  app.use('/api', limiter);

app.use(express.json())

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Protect against HTTP Parameter Pollution attacks
app.use(hpp())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client/build')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

app.use(notFound)

app.use(errorHandler)


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))