const { types } = require('joi');
const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    company:{
        type:String,
        required:[true, 'Please provide a company name'],
        maxlength:[50, 'Company name must be at most 50 characters long']
    },
    position:{
        type:String,
        required:[true, 'Please provide a job position'],
        maxlength:[100, 'Position name must be at most 50 characters long']
    },
    status:{
        type:String,
        enum:['interview', 'declined', 'pending'],
        default:'pending'
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:[true,"please provide user"]
    }


},{timestamps:true})

module.exports= mongoose.model('Job',JobSchema)
