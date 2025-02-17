const express = require('express');
const { registerUser, addUser, existUser } = require('../controllers/user/profileController');
const { validateRequest, validateAddRequest } = require('../middlewares/validateRequest');

const { cartRequest, wishlistRequest } = require('../middlewares/cartMiddlewares');
const { addToCart, addToWishlist, cartGet } = require('../controllers/user/cartController');

const router = express.Router();

// Registration route
router.post('/register', validateRequest, registerUser);
router.post('/signin', validateAddRequest, addUser);

router.post('/check-email', existUser);

router.post('/cart', cartRequest,  addToCart);
router.get('/cart', cartGet );
// router.delete('/cart', cartRequest,  removeFromCart);

router.post('/wishlist', wishlistRequest,  addToWishlist);
// router.delete('/cart', cartRequest,  removeFromCart);

module.exports = router; 
