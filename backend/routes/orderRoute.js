import express from 'express';
import { placeOrder, placeOrderRazorpay, placeOrderStripe,
    allOrders, userOrders, updateStatus,
     stripeWebhook, idOrder, verifyStripe
 } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import cartAuth from '../middleware/cartAuth.js';

const orderRouter = express.Router();


orderRouter.post('/verifystripee', express.raw(),stripeWebhook)

//admin
orderRouter.post('/list', express.json(), adminAuth, allOrders)
orderRouter.post('/status',express.json(), adminAuth, updateStatus)

//payment 
orderRouter.post('/placeorder',express.json(),cartAuth, placeOrder)
orderRouter.post('/stripe',express.json(), cartAuth, placeOrderStripe)
orderRouter.post('/razorpay',express.json(), cartAuth, placeOrderRazorpay)

//frontend user
orderRouter.post('/userorders', express.json(), cartAuth, userOrders)

//verify payment
orderRouter.post('/verifystripe/:id', express.json(), cartAuth, verifyStripe)
orderRouter.get('/verifystripe/:id', express.json(), cartAuth, idOrder)

export default orderRouter;

