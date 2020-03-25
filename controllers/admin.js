const Product = require('../models/product');
const uuid = require('uuidv4');

// ADD - PRODUCT
exports.getAddProduct = function (req, res, next) {
   res.render('admin/add-products', { 
      docTitle: 'Add Product',
      path: '/admin/add-product',
   });
};

exports.postAddProduct = function (req, res) {
   const {title, price, imageURL, description} = req.body;

   req.user.createProduct({
      product_uid: uuid(),
      title, price, description, 
      image_url: imageURL,
   })
   .then(() => {
      res.redirect('/admin/view-product');
   })
   .catch(err => console.log(err));
};

// EDIT PRODUCTS
exports.getEditProduct = function (req, res) {
   const prodID = req.params.productID;

   req.user.getProducts({
      where: {
         product_uid: prodID,
      }
   })
   // Product.findByPk(prodID)
   .then( product => {
      res.render('admin/edit-products', { 
         docTitle: 'Update Product',
         path: '/admin/add-product',
         product: product[0],
      });
   })
   .catch(err => {
      console.error(err);
      return res.redirect('/');
   });
};

exports.postEditProduct = function (req, res) {
   const {productID, title, price, imageURL, description} = req.body;
   
   Product.findByPk(productID)
   .then( product => {
      product.title = title;
      product.price = price;
      product.image_url = imageURL;
      product.description = description;
      return product.save();
   })
   .catch();
   res.redirect('/admin/view-product');
}

// DELETE
exports.deleteProduct = function (req, res) {
   const id = req.params.productID;

   Product.destroy({
      where: {
         product_uid: id,
      }
   })
   .then(() => {
      res.redirect('/admin/view-product');
   })
   .catch(err => {
      console.error(err);
      return alert('No such product');
   });
}

// VIEW ALL PRODUCTS
exports.getViewProducts = function (req, res) {
   req.user.getProducts()
   .then(rows => {
      res.render('admin/view-products', {
         docTitle: 'Admin - All Products',
         prods: rows,
         path: '/admin/view-product',
      });
   })
   .catch(err => console.error(err));
}