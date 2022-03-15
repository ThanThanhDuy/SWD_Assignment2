// const database = require('../../../configs/connectDB')
const consola = require('consola')
const browserObject = require('../../browser/index')
const topCVCrawler = require('../../crawler/topCV/index')
const topCVCrawlerCountPage = require('../../crawler/topCV/countPageOfKeyword')
const topCVCrawlerPerPage = require('../../crawler/topCV/crawlPerKeyword')
const insertIntoDatabase = require('../../database/topCV/topCV_DB')
const getJobFromTopCV = async (req, res) => {
  let browser = await browserObject.startBrowser()
  try {
    let keyword = req.body.keyword
    let result = await topCVCrawlerPerPage.scraper(browser, keyword)
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
      message: 'Get job from topcv successfully',
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
    let { maxPage, canCrawl } = await topCVCrawlerCountPage.scraper(
      browser,
      keyword
    )
    if (canCrawl) {
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
    } else {
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
  getJobFromTopCV,
  estimateTimeToCrawl
}
