// const database = require('../../../configs/connectDB')
const consola = require('consola')
const selectJob = require('../../database/job/selectJob')
const exportFilePDF = async (req, res) => {
  try {
    let listAttr = req.body.listAttr
    let listCondition = req.body.listCondition
    let data = await selectJob(listAttr, listCondition)
    consola.success({
      message: 'Get job from DB successfully',
      badge: true
    })
    return res.status(200).json({
      success: true,
      message: 'Get job from DB successfully',
      data
    })
  } catch (error) {
    consola.error({
      message: error,
      badge: true
    })
    res.status(500).json({
      success: false,
      message: error
    })
  }
  return
}

module.exports = {
  exportFilePDF
}
