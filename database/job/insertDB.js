const database = require('../index')

const Job = require('../../model/job')

const insertIntoDatabase = async data => {
  const ts = await database.transaction()
  try {
    for (const item of data) {
      await Job.upsert(item.dataValues, { transaction: ts })
    }
    await ts.commit()
  } catch (error) {
    await ts.rollback()
    throw error
  }
}
module.exports = insertIntoDatabase
