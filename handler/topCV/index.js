// const database = require('../../../configs/connectDB')
const topCVCrawler = require('../../crawler/topCV/index')
// const insertIntoDatabase = require('../../crawler/topCV/topcvDatabase')
const getJobFromTopCV = async (browser, keyword) => {
  try {
    let result = await topCVCrawler.scraper(browser, keyword)
    // await insertIntoDatabase(result)
    return result
  } catch (error) {
    throw error
  }
}

module.exports = {
  getJobFromTopCV
}
