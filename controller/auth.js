const {StatusCodes} = require("http-status-codes")
const User = require("../model/user")
// const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { BadRequest, UnauthenticatedError } = require("../errors")



const register = async(req,res)=>{
    // const {name,email,password} = req.body;
    const user =  await User.create({...req.body})

    // const salt =  await bcrypt.genSalt(10)
     // const hashedPassword = await bcrypt.hash(password, salt)
      // const tempUser = {name,email,password:hashedPassword}
    // const token = jwt.sign({userId:user._id,name:user.name},"jwtSecret",{
    //     expiresIn:"30d"
    // })

    // check user model to get the updated code .
    const token = user.createJWT()
    
res.status(StatusCodes.CREATED).json({user:{userId:user._id,name:user.name},token})

}


const login = async(req,res)=>{
    const {email,password } = req.body

    if(!email|| !password){
        throw new BadRequest("Please provide your email and password")
    }

    const user = await User.findOne({ email})

    if(!user){
        throw new UnauthenticatedError("Invalid email ")
    }

    const isPasswordCorrect =  await  user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnauthenticatedError("Invalid password")
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{email:user.email,name:user.name,},token})
    
    
    }



module.exports = {register, login}    