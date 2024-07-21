import History from '../models/history.model.js';

export const getHistory = async (req, res) => {
    try {
        const userHistory = await History.find({ userId: req.user.id }).populate('userId');
        res.json(userHistory);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching history' });
    }
};
