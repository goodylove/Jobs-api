const { BadRequest, NotFoundError } = require("../errors")
const Job = require("../model/jobs")

const { StatusCodes } = require("http-status-codes")


const getAlljobs = async (req, res) => {

    const jobs = await Job.find({ createdBy: req.user.userId }).sort('createdAt')
    console.log(req.user.userId)

    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const createJob = async (req, res) => {

    const { company, position, } = req.body

    if (!company || !position) {
        throw new BadRequest("Company and Position are required")
    }

    req.body.createdBy = req.user.userId

    const job = await Job.create({ ...req.body })

    res.status(StatusCodes.CREATED).json({ job })
}


const getSingleJob = async(req, res) => {

const {user:{userId},params:{jobId}} = req

const job =  await Job.findOne({
    _id:jobId,
    createdBy:userId
})


if(!job){
throw new NotFoundError("No Job with such  ID")
}

res.status(StatusCodes.OK).json({job})

}



const deleteJob = async(req, res) => {

const {user:{userId},params:{jobId}} = req

const job = await Job.findByIdAndDelete({createdBy:userId,_id:jobId})

if(!job) {
        throw new NotFoundError("No Job with such ID")
}

res.status(StatusCodes.OK).json({job})


}


const updateJob = async(req, res) => {
    
    const {user:{userId},params:{jobId},body:{company,position}} = req

    if(company === "" || position ==="" ){

        throw new BadRequest("Company and Position are required")

    }

 const job = await Job.findByIdAndUpdate({createdBy:userId,_id:jobId},req.body,{
        new: true,
        revalidate:true,
        })
    
    if(!job) {
        throw new NotFoundError("No Job with such ID")
    }


    res.status(StatusCodes.OK).json({job})


}


module.exports = { updateJob, deleteJob, createJob, getAlljobs, getSingleJob }     