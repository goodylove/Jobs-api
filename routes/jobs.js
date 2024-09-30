const express = require('express');
const { getAlljobs, createJob, getSingleJob, deleteJob, updateJob } = require('../controller/jobs');
const jobRouter = express.Router();



jobRouter.route('/').get(getAlljobs).post(createJob)
jobRouter.route('/:jobId').get(getSingleJob).delete(deleteJob).patch(updateJob)

module.exports = jobRouter;