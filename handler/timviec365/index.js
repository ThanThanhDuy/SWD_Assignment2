// const database = require('../../../configs/connectDB')
const consola = require('consola')
const browserObject = require('../../browser/index')
const topviec365CrawlerPerPage = require('../../crawler/timviec365/crawlPerKeyWord')
const insertIntoDatabase = require('../../database/topCV/topCV_DB')
const getJobFromTimviec365 = async (req, res) => {
  let browser = await browserObject.startBrowser()
  try {
    let keyword = req.body.keyword
    let result = await topviec365CrawlerPerPage.scraper(browser, keyword)
    // let result = await topCVCrawler.scraper(browser, listKeyword)
    await insertIntoDatabase(result.data)
    console.log('close browser')
    setTimeout(() => {
      browser.close()
    }, 3000)
    return res.status(200).json({
      success: true,
      message: 'Get job from timviec365 successfully',
      time: result.time
    })
  } catch (error) {
    consola.error({
      message: error,
      badge: true
    })
    console.log('close browser')
    browser.close()
    res.status(500).json({
      success: false,
      message: error
    })
  }
  return
}

module.exports = {
  getJobFromTimviec365
}
