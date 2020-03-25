// const path = require('path');

const express = require('express');
const router = express.Router();

const adminControl = require('../controllers/admin');

// ADD
// the route is /admin/add-product
router.get('/add-product', adminControl.getAddProduct);
// the route is /admin/product
router.post('/product', adminControl.postAddProduct);

// EDIT
// the route is /admin/edit-product
router.get('/edit-product/:productID', adminControl.getEditProduct);
router.post('/edit-product', adminControl.postEditProduct);

// DELETE product
router.post('/delete-product/:productID', adminControl.deleteProduct);

// VIEW
// the route is /admin/view-product
router.get('/view-product', adminControl.getViewProducts);


module.exports = router;