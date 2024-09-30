const jwt = require("jsonwebtoken");
const User = require("../model/user")
const {UnauthenticatedError} = require("../errors")



const auth = async (req, res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader ||!authHeader.startsWith("Bearer ")){
        throw new UnauthenticatedError("No token provided")
    }
    
    const token = authHeader.split(" ")[1]
    try {

        const payload = jwt.verify(token,process.env.JWT_SECRET_KEY)

        // ALTERNATIVE CODE
          // const user = await User.findById(payload.userId).select("-password")
        // req.user = user

        req.user = {userId:payload.userId,name:payload.name}  

     next()


        
    } catch (error) {
        throw new UnauthenticatedError("Invalid token", error)
        
    }

}


module.exports = auth;