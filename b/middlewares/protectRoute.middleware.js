import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute= async (req,res,next)=>{

    try {
        const token=req.cookies.jwt;
    
        if(!token){
            return res.status(401).json({error:"Unauthorised request: Invalid token. Login FIrst"})
        }
    
        const decoded= await jwt.verify(token,process.env.JWT_SECRET);
    
        if(!decoded){
            return res.status(401).json({error:"Unauthorised request: Invalid token"})
        }
        // console.log("decoded:=>",decoded);
        
        // console.log("yhhan tak thik hsi")

        const user= await User.findById(decoded.userId).select("-password");
        // console.log("yhhan tak thik hsi")

        if(!user){
            return res.status(404).json({error:"User not found"})
    
        }
    
        req.user=user;
        next();
    
    } catch (error) {
        console.log("Error in protectRoute middleware: ", error.message);
		res.status(500).json({ error: "Internal server error" });

        
    }
}
export default protectRoute;