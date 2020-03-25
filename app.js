const dotenv = require('dotenv').config({
   path: './config/config.env',
});
const express = require('express');
const bp = require('body-parser');
const path = require('path');
const uuid = require('uuidv4');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
const notFound = require('./controllers/404');

const sqlz = require('./util/database');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.set('views', 'views');

app.use(
   bp.urlencoded({
      extended: false,
   })
);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
   User.findByPk('24f1fcc6-d90a-4951-a186-edde73425283')
      .then(user => {
         req.user = user;
         next();
      })
      .catch(err => console.error(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(notFound.getNotFound);

// ASSOCIATIONS
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);

Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });

Product.belongsToMany(Cart, { through: CartItem });
Product.belongsTo(User, {
   constraints: true,
   onDelete: 'CASCADE',
});

Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

sqlz
   // .sync({ force: true })
   .sync()
   .then(result => {
      // console.log(result);
      return User.findByPk('24f1fcc6-d90a-4951-a186-edde73425283');
   })
   .then(user => {
      if (!user) {
         return User.create({
            user_uid: uuid(),
            first_name: 'Abraham',
            last_name: 'Anak Agung',
            email: 'abraham.agel@outlook.com',
            country: 'Indonesia',
         });
      }

      return user;
   })
   .then(user =>
      user.createCart({
         // cart_uid: uuid(),
         cart_uid: 'df429b1c-6f5d-4ffa-b0c7-d19095f560fa',
      })
   )
   .catch(err => console.error(err));

app.listen(port, 'localhost', () => {
   console.log(`server is running at localhost:${port}`);
});
