const urlTopCV = require('../../constant/topCV')
const scraperObject = {
  url: urlTopCV.BASE_URL_TOPCV,
  async scraper(browser, keyword) {
    let page = await browser.newPage()
    consola.log({
      message: `Estimate ${keyword}`,
      badge: true
    })
    // console.log(`Navigating to ${this.url}`)
    // chuyen den trang chu
    await page.goto(urlTopCV.BASE_URL_TOPCV, { waitUntil: 'networkidle2' })
    // chuyen den trang viec lam
    // console.log(`Navigating to ${urlTopCV.URL_VIEC_LAM_TOPCV}`)
    await page.goto(urlTopCV.URL_VIEC_LAM_TOPCV, {
      waitUntil: 'networkidle2'
    })
    // input text to search
    await page.waitForSelector('.search-input input#keyword')
    await (await page.$('input#keyword')).type(keyword)
    await page.keyboard.press('Enter')
    // wait for dom loaded
    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    })
    let maxPage
    let numberPage = await page.$$eval('.pagination > li', listPage => {
      number = listPage.map(el => {
        if (el.querySelector('a')) {
          return el.querySelector('a').innerText
        }
      })
      return number
    })
    maxPage = numberPage.slice(1, -1).pop() ? numberPage.slice(1, -1).pop() : 0
    let checkDataPage =
      (await page.$(
        '#main > div.search-job > div.container > div.list-empty'
      )) || null
    return {
      maxPage,
      canCrawl: true ? !checkDataPage : false
    }
  }
}

module.exports = scraperObject
