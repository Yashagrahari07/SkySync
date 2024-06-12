import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

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