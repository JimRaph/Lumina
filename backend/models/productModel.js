import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    sizes: {
        type: Array,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    bestseller: {
        type: Boolean,
        required: true
    }
    ,
    date: {
        type: Number,
        required: true
    }
})

//everytime we call this model, it is created again
//we add || to ensure it is created just once

const productModel = mongoose.models.product || mongoose.model('Product', productSchema);

export default productModel;