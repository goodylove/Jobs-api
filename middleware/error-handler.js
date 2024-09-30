const { StatusCodes } = require("http-status-codes");
const { CustomErrorAPI } = require("../errors");
// const CustomErrorAPI = require("../errors/custom-error");

const errorHandlerMiddleware = (err,req,res,next)=>{
  
  // create custom error object if custom error is thrown, else default error object is created.



  let customError = {
    // set default 
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:err.message || 'Something went wrong try again later',
  }


    // if (err instanceof  CustomErrorAPI) {
    //     return res.status(err.statusCode).json({ msg: err.message })
    //   }



    
    
    if(err.name === 'ValidatorError'){

    customError.statusCode = 400
    customError.msg = Object.values(err.errors).map(e=>e.message).join(', ')
    

  }

if(err.name === 'CastError'){
    customError.msg = `No item found with id ${err.value}`
    customError.statusCode = 404
    
    
  }
  
   if(err.code === 11000){
        customError.msg = `Duplicate values entered for ${Object.keys(err.keyValue)} field,please choose a different value`,
        customError.statusCode = 400
      }

    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err })
    return res.status(customError.statusCode).json({ msg:customError.msg })

}

module.exports = errorHandlerMiddleware;

