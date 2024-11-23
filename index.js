const express = require('express');
const mongoose = require('mongoose');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceInputRouter = require('./router/ServiceInputRouter');
const userRouter = require('./router/UserRouter');

const app = express();

dotEnv.config();

// Middleware setup
app.use(express.json());  // Ensure this is before the routes
app.use(bodyParser.json());  // Optional, express.json() is usually enough
app.use(cors());  // CORS setup after body parsing

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.log('ERROR: ', error);
    });

// Custom routers
app.use('/requests', serviceInputRouter);
app.use('/user', userRouter);  // Make sure this is correct path

app.get('/working', (req, res) => {
    res.send("app working properly");
});

app.listen(PORT, () => {
    console.log(`Server is started and connected at PORT: ${PORT}`);
});
