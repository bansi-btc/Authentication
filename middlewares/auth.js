// authenticity
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=async(req, res, next)=>{
    try{
        // extract jwt token
        // other ways to fetch token
        const token=req.body.token || req.cookies.token;

        if(!token){
            return res.status(401).json({
                success:false,
                message:"token missing",
            })
        }

        // verify the token
        try{
            const decode=jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);

            req.user=decode;
        }
        catch(err){
            return res.status(401).json({
                success:false,
                message:"token is invalid",
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"Something went wrong while verifying the token"
        })
    }
}

exports.isStudent=async(req, res, next)=>{
    try{
        if(req.user.role!=='Student'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student",
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"User role is not matching",
        })
    }

};
exports.isAdmin=async(req, res, next)=>{
    try{
        if(req.user.role!=='Admin'){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for admin",
            })
        }
        next();
    }
    catch(err){
        return res.status(401).json({
            success:false,
            message:"User role is not matching",
        })
    }

}
