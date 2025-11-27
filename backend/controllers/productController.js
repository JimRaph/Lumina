import {v2 as cloudinary} from 'cloudinary'
import productModel from '../models/productModel.js'


const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestseller, sizes } = req.body;

        console.log("Step 1: Parsed request body:", req.body);

        // Extract images from request
        const image1 = req.files?.image1?.[0];
        const image2 = req.files?.image2?.[0];
        const image3 = req.files?.image3?.[0];
        const image4 = req.files?.image4?.[0];

        const images = [image1, image2, image3, image4].filter((image) => image !== undefined);
        console.log("Step 2: Extracted images:", images);

        // Upload images to Cloudinary
        let imagesURL = [];
        try {
            imagesURL = await Promise.all(
                images.map(async (image) => {
                    const result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                    return result.secure_url;
                })
            );
        } catch (uploadError) {
            console.error("Image upload error:", uploadError.message);
            return res.status(500).json({ success: false, message: "Failed to upload images", error: uploadError.message });
        }

        console.log("Step 3: Uploaded images:", imagesURL);

        // Create product object
        const productInfo = {
            name,
            description,
            price: Number(price),
            category,
            subcategory: subCategory,
            bestseller: bestseller === "true",
            sizes: JSON.parse(sizes),
            image: imagesURL,
            date: Date.now(),
        };

        console.log("Step 4: Created product info:", productInfo);

        // Save product to database
        const product = new productModel(productInfo);

        try {
            await product.save();
            console.log("Step 5: Product saved to database");
        } catch (dbError) {
            console.error("Database error:", dbError.message);
            return res.status(500).json({ success: false, message: "Database save failed", error: dbError.message });
        }

        console.log("Step 6: Before sending success response");
        res.json({ success: true, message: "Product added successfully" });
        console.log("Step 7: After sending success response");
        
    } catch (error) {
        console.error("Error in addProduct:", error.message);
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};



const listProduct = async (req, res) => {
    try {
        const allProducts = await productModel.find({})
        res.json({success: true, products: allProducts})
    } catch (error) {
        console.error(error.message)
        res.json({success: false, message: error.message})
    }
}


const removeProduct = async (req, res) => {
    try {
        const id = req.body.id
        const product = await productModel.findByIdAndDelete(id)
        if(!product) {
            return res.status(404).json({success: false, message: "Product not found"})
        }
        res.json({success: true, message: "Product deleted successfully"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: error.message})
    }
}


const singleProduct = async (req, res) => {
    try {
        // const {productId} = req.body.id
        // const product = await productModel.findById(productId)
        const id = req.body.id
        const product = await productModel.findById({id})
        if(!product) {
            return res.status(404).json({success: false, message: "Product not found"})
        }
        res.json({success: true, product})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({success: false, message: error.message})
    }
}

export {addProduct, removeProduct, singleProduct, listProduct}