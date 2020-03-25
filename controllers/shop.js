const uuid = require('uuidv4');
const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = function(req, res) {
   Product.findAll()
      .then(rows => {
         res.render('shop/product-list', {
            docTitle: 'All Products',
            prods: rows,
            path: '/products',
         });
      })
      .catch(err => console.error(err));
};

exports.getProduct = function(req, res, next) {
   const productID = req.params.productID;

   // Product.findAll({
   //    where: {id: productID}
   // })
   // .then(({rows}) => {
   //    res.render('shop/product-detail', {
   //       docTitle: `${rows.title}`,
   //       product: rows,
   //       path: '/products',
   //    });
   // })

   Product.findByPk(productID)
      .then(row => {
         res.render('shop/product-detail', {
            docTitle: `${row.title}`,
            product: row,
            path: '/products',
         });
      })
      .catch(err => console.error(err));
};

exports.getIndex = function(req, res) {
   Product.findAll()
      .then(rows => {
         res.render('shop/index', {
            docTitle: 'All Products',
            prods: rows,
            path: '/',
         }).catch(err => console.error(err));
      })
      .catch(err => console.error(err));
};

exports.getCart = function(req, res) {
   req.user
      .getCart()
      .then(cart => {
         if (!cart) {
            return res.render('shop/cart', {
               docTitle: 'Your Cart',
               path: '/cart',
               products: [],
               totalPrice: 0,
            });
         }
         return cart
            .getProducts()
            .then(product => {
               res.render('shop/cart', {
                  docTitle: 'Your Cart',
                  path: '/cart',
                  products: product,
               });
            })
            .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
};

exports.postAddCart = function(req, res) {
   const prodID = req.body.productID;
   let fetchedCart;
   let newQty = 1;

   req.user
      .getCart()
      .then(cart => {
         fetchedCart = cart;
         return cart.getProducts({
            where: {
               product_uid: prodID,
            },
         });
      })
      .then(products => {
         // If product exist, add its quantity by 1
         if (products.length > 0) {
            newQty = products[0].cart_item.quantity + 1;
            return products;
         }

         // Add product if not exist yet
         return Product.findByPk(prodID);
      })
      .then(product =>
         fetchedCart.addProducts(product, {
            through: {
               quantity: newQty,
            },
         })
      )
      .then(() => res.redirect('/cart'))
      .catch(err => console.error(err));
};

exports.deleteCartItem = function(req, res) {
   const { productID } = req.body;

   req.user
      .getCart()
      .then(cart =>
         cart.getProducts({
            where: { product_uid: productID },
         })
      )
      .then(product => product[0].cart_item.destroy())
      .then(() => res.redirect('/cart'))
      .catch(err => console.error(err));
};

exports.postOrder = function(req, res) {
   let fetchedCart;
   req.user
      .getCart()
      .then(cart => {
         fetchedCart = cart;
         return cart.getProducts();
      })
      .then(products => {
         return req.user
            .createOrder({
               order_uid: '13528dde-2a26-4888-83ea-8e81c723370d',
            })
            .then(order => {
               return order.addProducts(
                  products.map(product => {
                     product.order_item = {
                        quantity: product.cart_item.quantity,
                     };
                     return product;
                  })
               );
            })
            .catch(err => console.error(err));
      })
      .then(result => fetchedCart.setProducts(null))
      .then(result => res.redirect('/orders'))
      .catch(err => console.error(err));
};

exports.getOrders = function(req, res) {
   req.user.getOrders({
      include: ['products']
   })
   .then(orders => {
      res.render('shop/orders', {
         docTitle: 'Your Order',
         path: '/orders',
         active: true,
         orders
      });

   })
   .catch(err => console.error(err))
};

exports.getCheckout = function(req, res) {
   res.render('shop/checkout', {
      docTitle: 'Checkout',
      path: '/checkout',
      active: true,
   });
};
