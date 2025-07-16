const Sweet = require('../models/Sweet');

// Add Sweet
exports.addSweet = async(req, res) => {
    const sweet = new Sweet(req.body);
    await sweet.save();
    res.status(201).json(sweet);
};

// Get All Sweets
exports.getSweets = async(req, res) => {
    const sweets = await Sweet.find();
    res.json(sweets);
};

// Delete Sweet
exports.deleteSweet = async(req, res) => {
    const { id } = req.params;
    await Sweet.findByIdAndDelete(id);
    res.json({ message: 'Sweet deleted' });
};