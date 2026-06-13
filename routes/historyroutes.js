const express = require('express');
const History = require('../models/History');
const router = express.Router();

// GET /api/history - Return saved city history
router.get('/', async (req, res) => {
    try {
        const history = await History.find().sort({ searchedAt: -1 }).limit(10);
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// POST /api/history - Save searched city
router.post('/', async (req, res) => {
    try {
        const { city } = req.body;
        if (!city) return res.status(400).json({ error: 'City name required' });

        // Check for existing city (case-insensitive)
        let record = await History.findOne({ city: { $regex: new RegExp(`^${city}$`, 'i') } });

        if (record) {
            // Update timestamp to move it to the top
            record.searchedAt = Date.now();
            await record.save();
        } else {
            // Create new record
            record = await History.create({ city });
        }

        // Limit to 10 cities
        const total = await History.countDocuments();
        if (total > 10) {
            const oldest = await History.find().sort({ searchedAt: 1 }).limit(total - 10);
            const oldestIds = oldest.map(doc => doc._id);
            await History.deleteMany({ _id: { $in: oldestIds } });
        }

        res.status(201).json(record);
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

// DELETE /api/history - Clear history
router.delete('/', async (req, res) => {
    try {
        await History.deleteMany({});
        res.json({ message: 'History cleared' });
    } catch (error) {
        res.status(500).json({ error: 'Database error' });
    }
});

module.exports = router;