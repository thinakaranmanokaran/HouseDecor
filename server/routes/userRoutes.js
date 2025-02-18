const express = require('express');
const { registerUser, addUser, existUser } = require('../controllers/user/profileController');
const { validateRequest, validateAddRequest, otpRequest } = require('../middlewares/validateRequest');

const { cartRequest, wishlistRequest } = require('../middlewares/cartMiddlewares');
const { addToCart, addToWishlist, cartGet } = require('../controllers/user/cartController');

const { sendOTP, verifyOTP } = require('../controllers/user/authController');

const router = express.Router();

// Registration route
router.post('/register', validateRequest, registerUser);
router.post('/signin', validateAddRequest, addUser);

router.post('/check-email', existUser);

router.post('/send-otp', sendOTP);
router.post('/verify-otp', otpRequest, verifyOTP);

router.post('/cart', cartRequest,  addToCart);
router.get('/cart', cartGet );
// router.delete('/cart', cartRequest,  removeFromCart);

router.post('/wishlist', wishlistRequest,  addToWishlist);
// router.delete('/cart', cartRequest,  removeFromCart);

module.exports = router; 
