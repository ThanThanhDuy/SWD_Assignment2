const Job = require('../../model/job')
const { Op } = require('sequelize')
const selectDatabase = async (attributes, condition) => {
  try {
    const data = await Job.findAll({
      attributes,
      where: {
        [Op.or]: condition
      }
    })
    return data
  } catch (error) {
    throw error
  }
}
module.exports = selectDatabase
