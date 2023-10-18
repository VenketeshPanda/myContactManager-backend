const express = require('express');
const dotenv = require('dotenv').config();
const app = express();
const contactRoutes = require('./Routes/contactRoutes');
const connectDb = require('../myContactManager-backend/config/dbConnection')
const errorHandler = require('./Middlewares/errorHandler');
app.use(express.json())

connectDb()
app.use('/api/contacts', contactRoutes)
app.use('/api/users', require('./Routes/userRoutes'))
app.use(errorHandler)

const port = process.env.PORT || 8090
app.listen(port, () => {
    console.log('Server running on port: ' + port)
})