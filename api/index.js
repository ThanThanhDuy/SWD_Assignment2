const topCV_Crawler = require('../handler/topCV/index')
const browserObject = require('../browser/index')
export default async function (req, res, next) {
  console.log(req.url)
  if (req.url.trim() === '/getdata') {
    res.setHeader('content-type', 'application/json')
    let browser = await browserObject.startBrowser()
    try {
      const result = await topCV_Crawler.getJobFromTopCV(browser, [
        'lập trình viên c/c++'
      ])
      console.log('close browser')
      setTimeout(() => {
        browser.close()
      }, 3000)
      return res.end(
        JSON.stringify({
          success: true,
          data: result
        })
      )
    } catch (error) {
      console.log('close browser')
      console.log(error)
      browser.close()
      res.end(
        JSON.stringify({
          success: false,
          message: error
        })
      )
    }
    return
  }
  next()
}
