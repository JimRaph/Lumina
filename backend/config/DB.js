import mongoose from "mongoose";

const connectDB = async() =>{
    console.log(process.env.MONGO_URI)
    try {
        mongoose.connection.on('connected', ()=>{console.log('Database connected')})
       await mongoose.connect(`${process.env.MONGO_URI}/AFF-LUX`,  )
    } catch (error) {
        console.log('error connecting to Mongo', error)
    }
}



export default connectDB;