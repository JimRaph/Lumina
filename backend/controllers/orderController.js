import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
console.log(process.env.STRIPE_WEBHOOK_SECRET)

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const currency = 'USD';
const deliveryCharge = 10;


const placeOrder= async(req, res) =>{

    try {
        const {userId, items, address, amount } = req.body;

        const orderInfo = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
        }

        const newOrder = new orderModel(orderInfo)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cart: {}})

        res.json({success: true, message: 'Order created successfully'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}


const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers;

        console.log('origin: ' + origin);

        const orderInfo = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
        };

        const newOrder = new orderModel(orderInfo);
        await newOrder.save();

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.qty,
        }));

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charge',
                },
                unit_amount: deliveryCharge * 100,
            },
            quantity: 1,
        });

        // Include metadata for order tracking
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
            payment_intent_data:{
                metadata: {
                    orderId: newOrder._id.toString(),
                    userId: userId.toString(),
                },
            },
            metadata: {
                orderId: newOrder._id.toString(),
                userId: userId.toString(),
            },
        });

        // console.log('SESSION- ', session);
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.log('Error with stripe payment: ', error.message);
        res.json({ success: false, message: `Error with stripe payment: ${error.message}` });
    }
};



const stripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;
    let orderId;
    let userId
    console.log('HEADER- ', req.headers)
    console.log(sig);
    
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET,
            6000       
        );

        console.log('webhook received event: ', event.type)

    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed': {
            const session = event.data.object;

            try {
                const { orderId, userId } = session.metadata;

                if (session.payment_status === 'paid') {
                    await orderModel.findByIdAndUpdate(orderId, { payment: true });
                    await userModel.findByIdAndUpdate(userId, { cart: {} });
                    
                    console.log(`Order ${orderId} marked as paid.`);
                    console.log('SESSION: ', session)
                }
            } catch (error) {
                console.log(`Error processing checkout session: ${error.message}`);
            }
            // Extract metadata and payment status
            break;
        }

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Acknowledge receipt of the event
    // res.status(200).send('Webhook received.');
    res.json({ orderId: orderId, userId: userId, success:true})
};

const verifyStripe = async(req, res) => {
    try {
        const {orderId, success, userId} = req.body
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cart: {}})
            res.json({payment:true, success: true, message: "Stripe payment successful"})
        }else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success: true, message: "Stripe payment failed. Order deleted"})
        }
    } catch (error) {
        console.log('Error with verifying stripe payment: ', error.message)
        res.json({success: false, message: `Error with verifying stripe payment: ${error.message}`})
    }
}


//For admin page
const allOrders = async(req, res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    } catch (error) {
        console.log('error from allOrders func', error.message)
        res.json({success: false, message: `Error getting all orders: ${error.message}`})
    }
}

const userOrders = async(req, res) =>{
    try {
        const {userId} = req.body
        if(!userId){
            res.json({success: false, message: "User Id not found"})
        }
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})

    } catch (error) {
        console.log('Error getting user orders', error)
        res.json({success: false, message: `Error getting user orders: ${error.message}`})
    }
}

const idOrder = async (req, res) => {
    // const id = new mongoose.Types.ObjectId(req.params.id)
    console.log(req.params.id)
    try {
       
        const order = await orderModel.findById(req.params.id)
        
        if(!order){
            return res.json({message: 'Order not found'})
        }
        res.json({message: 'order found', payment: order.payment, status: order.status})
    } catch (error) {
        console.log('Error getting order: ', error)
        res.json({message: 'Error while getting order', error: error})
    }
}

//For admin page
const updateStatus = async(req, res) =>{
    try {
        const {orderId, status} = req.body

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: 'Order status updated'})
    } catch (error) {
        console.log('Error updating orders status: ', error)
        res.json({success: false, message: `Error updating orders status: ${error.message}`})
    }
}

export {placeOrder, updateStatus, userOrders, placeOrderStripe, allOrders, idOrder, stripeWebhook, verifyStripe}