const mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")



const UserSChema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Please provide a name'],
        minlength:[3, 'Name must be at least 3 characters long'],
        maxlength:[50, 'Name must be at most 50 characters long']
    },
    email:{
        type:String,
        required:[true, 'Please provide an email'],
        unique:true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email',"Please provide an email"]
    },
    password:{
        type:String,
        required:[true, 'Please provide a password'],
        minlength:[6, 'Password must be at least 8 characters long'],
    }

})

UserSChema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// UserSChema.methods.getName = function(){
//     return this.name
// }

UserSChema.methods.createJWT = function(){
    return  jwt.sign({userId: this._id,name: this.name},process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_LIFE_TIME
    })

}

// compare password using mongoose middleware
UserSChema.methods.comparePassword = async function(incomingPassword){
    const isMatch = await bcrypt.compare(incomingPassword, this.password)
    return isMatch

}




module.exports= mongoose.model('User',UserSChema)