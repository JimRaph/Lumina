import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: Object,
        default: {}
    }
}, {minimize: false})

//minimize:false is used to stop mongo from ignoring the cart item since it's an empty object.
//mongo ignores empty objects

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel;