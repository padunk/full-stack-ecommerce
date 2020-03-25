const express = require('express');
const router = express.Router();

const shopControl = require('../controllers/shop');

router.get('/', shopControl.getProducts);
router.get('/products', shopControl.getProducts);
router.get('/products/:productID', shopControl.getProduct);
router.get('/cart', shopControl.getCart);

router.post('/add-cart', shopControl.postAddCart);

router.post('/delete-cart-item', shopControl.deleteCartItem);
router.post('/create-order', shopControl.postOrder)

router.get('/orders', shopControl.getOrders);
router.get('/checkout', shopControl.getCheckout);

module.exports = router;