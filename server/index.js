import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import historyRouter from './routes/history.route.js';
import weatherRouter from './routes/weather.route.js';

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("DB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/weather', weatherRouter);
app.use('/api/history', historyRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});