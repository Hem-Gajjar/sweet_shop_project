const express = require('express');
const router = express.Router();
const {
    addSweet,
    getSweets,
    deleteSweet,
    purchaseSweet,
    restockSweet
} = require('../controllers/sweetController');

router.post('/', addSweet);
router.get('/', getSweets);

module.exports = router;