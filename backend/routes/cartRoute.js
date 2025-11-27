import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cartController.js';
import cartAuth from '../middleware/cartAuth.js';
const cartRouter = express.Router();


cartRouter.post('/add', cartAuth, addToCart);
cartRouter.post('/update', cartAuth, updateCart);
cartRouter.post('/getcart', cartAuth, getUserCart);

export default cartRouter;