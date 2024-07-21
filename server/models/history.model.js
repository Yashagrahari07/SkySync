import mongoose from 'mongoose';

const historySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { type: String, required: true },
    weather: {
        temperature: { type: Number, required: true },
        humidity: { type: Number, required: true },
        description: { type: String, required: true },
        windSpeed: { type: Number, required: true }
    },
    date: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);

export default History;
