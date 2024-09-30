

class CustomErrorAPI extends Error {
    constructor(message) {
        super(message);
        // this.statusCode = statusCode;
    }
}


// const CustomError = (msg,status)=>{
//     return new CustomErrorAPI(msg,status);

// }

module.exports = CustomErrorAPI