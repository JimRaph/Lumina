import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) =>{
    try {
        const {token} = req.headers;
        console.log('token0: ',token)
        if(!token){
            return res.status(401).json({success: false, message: "You are not authorize"})
        }
       
        console.log('token1: ',token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) 
        console.log('token2: ',token)
        console.log('decoded: ',decoded)   
        if(decoded.id !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "You are not authorized3"})
        }
        console.log(decoded)
        // req.body.userId = decoded;
       return next();
    } catch (error) {
        console.log(error.message);
        res.status(500).json({success: false, message: "error with admin authentication"})
    }
}

export default adminAuth;