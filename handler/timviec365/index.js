// const database = require('../../../configs/connectDB')
const consola = require('consola')
const browserObject = require('../../browser/index')
// const topCVCrawler = require('../../crawler/topCV/index')
const timviec365CrawlerCountPage = require('../../crawler/timviec365/countPagePerKeyWord')
const timviec365CrawlerPerPage = require('../../crawler/timviec365/crawlPerKeyWord')
const insertIntoDatabase = require('../../database/topCV/topCV_DB')
const getJobFromTimviec365 = async (req, res) => {
  let browser = await browserObject.startBrowser()
  try {
    let keyword = req.body.keyword
    let result = await timviec365CrawlerPerPage.scraper(browser, keyword)
    // let result = await topCVCrawler.scraper(browser, listKeyword)
    await insertIntoDatabase(result.data)
    consola.success({
      message: 'Insert into DB successfully',
      badge: true
    })
    consola.success({
      message: 'close browser',
      badge: true
    })
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
    consola.error({
      message: 'close browser',
      badge: true
    })
    browser.close()
    res.status(500).json({
      success: false,
      message: error
    })
  }
  return
}

const estimateTimeToCrawl = async (req, res) => {
  let browser = await browserObject.startBrowser()
  try {
    let keyword = req.query.keyword
    let { maxPage, canCrawl } = await timviec365CrawlerCountPage.scraper(
      browser,
      keyword
    )
    if (!canCrawl && maxPage === 0) {
      consola.info({
        message: `don't have any job in ${keyword}`,
        badge: true
      })
      setTimeout(() => {
        browser.close()
      }, 3000)
      return res.status(200).json({
        success: false,
        message: `don't have any job in ${keyword}`
      })
    } else {
      let time = parseInt(3) + parseInt(maxPage)
      consola.info({
        message: `estimate time to crawl ${keyword} successfully in ${time} minutes`,
        badge: true
      })
      setTimeout(() => {
        browser.close()
      }, 3000)
      return res.status(200).json({
        success: true,
        message: `estimate time to crawl ${keyword} successfully in ${time} minutes`,
        time: time
      })
    }
  } catch (error) {
    consola.error({
      message: error,
      badge: true
    })
    consola.error({
      message: 'close browser',
      badge: true
    })
    browser.close()
    res.status(500).json({
      success: false,
      message: error
    })
  }
  return
}

module.exports = {
  getJobFromTimviec365,
  estimateTimeToCrawl
}
