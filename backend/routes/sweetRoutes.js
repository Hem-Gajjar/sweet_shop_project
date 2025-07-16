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
router.delete('/:id', deleteSweet);


module.exports = router;