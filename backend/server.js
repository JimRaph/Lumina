import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import connectCD from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express();

dotenv.config();
console.log(process.env.MONGO_URI)
const port = process.env.PORT || 4000
connectDB()
connectCD()

app.use(cors())

app.post('/api/order/verifystripee', express.raw({ type: 'application/json' }));
app.use('/api/order', orderRouter)

app.use(express.json());

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

app.listen(port, ()=>console.log(`listening on port: ${port}`))