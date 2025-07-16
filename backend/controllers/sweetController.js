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

// Purchase Sweet
exports.purchaseSweet = async(req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;

    try {
        const sweet = await Sweet.findById(id);
        if (!sweet) return res.status(404).json({ message: "Sweet not found" });

        if (sweet.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock" });
        }

        sweet.quantity = quantity;
        await sweet.save();

        res.json(sweet);
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
};

// Restock Sweet
exports.restockSweet = async(req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
    const sweet = await Sweet.findById(id);
    sweet.quantity += quantity;
    await sweet.save();
    res.json(sweet);
};