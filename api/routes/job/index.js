const { Router } = require('express')
const jobHandlerTopCV = require('../../../handler/topCV/index')
const jobHandlerTimviec365 = require('../../../handler/timviec365/index')
const exportFileHandler = require('../../../handler/exportFile/exportFile')
const router = Router()

router.post('/v1/job/getJobFromTopCV', jobHandlerTopCV.getJobFromTopCV)
router.get(
  '/v1/job/estimateTimeToGetJobFromTopCV',
  jobHandlerTopCV.estimateTimeToCrawl
)
router.get(
  '/v1/job/estimateTimeToGetJobFromTimviec365',
  jobHandlerTimviec365.estimateTimeToCrawl
)
router.post(
  '/v1/job/getJobFromTimviec365',
  jobHandlerTimviec365.getJobFromTimviec365
)
router.post('/v1/job/getJobFromDBToPDF', exportFileHandler.exportFilePDF)
module.exports = router
