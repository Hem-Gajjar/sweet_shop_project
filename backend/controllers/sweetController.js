const Sweet = require('../models/Sweet');

// Add Sweet
exports.addSweet = async(req, res) => {
    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).json(sweet);
};