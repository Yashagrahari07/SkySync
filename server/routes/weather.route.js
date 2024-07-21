import express from 'express';
import { getWeather } from '../controllers/weather.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.get('/getweather', verifyToken, getWeather);

export default router;