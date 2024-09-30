const jwt = require("jsonwebtoken");
const { UnauthenticatedError, BadRequest } = require("../errors");


const login = async (req, res) => {
    const { username, password } = req.body; 
    // TODO: validate the username and password
   
    // three different way to validate the incoming request
    // 1. using middleware (express-validator)
    // 2. using a library like Joi (https://github.com/hapijs/joi)
    // 3. using a validation function in the controller


     // Basic validation

     if(!username || !password){
        throw new BadRequest('Username and password are required')
    }

    // just for demo, normally provided by DB

    const id = new Date().getTime()

    // try  to keep the payload small,better experience for the user
    const token = jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:"30d"})

    res.status(200).json({msg:"user created successfully",token})

}

const dashboard = async (req, res) => {
    // const authHeader = req.headers.authorization
    // if(!authHeader ||!authHeader.startsWith('Bearer ')){
    //     throw new CustomErrorAPI('No token provided',401)
    // }
    
    // const token = authHeader.split(' ')[1]
    const {id,username} = req.user
    
    const luckyNumber = Math.floor(Math.random() *100);
    return  res.status(200).json({msg: `Hello ${username}!`,secret:    `Here is your authorized data ,your lucky number is ${luckyNumber}`});

     
}



module.exports = { login, dashboard }