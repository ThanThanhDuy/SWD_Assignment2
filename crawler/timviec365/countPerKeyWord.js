const urlTimviec365 = require('../../constant/timviec365')
const scraperObject = {
  url: urlTimviec365.BASE_URL,
  async scraper(browser, keyword) {
    let page = await browser.newPage()
    consola.log({
      message: `Estimate ${keyword}`,
      badge: true
    })
    // chuyen den trang chu
    await page.goto(urlTimviec365.BASE_URL, { waitUntil: 'networkidle2' })
    // chuyen den trang viec lam
    await page.goto(urlTimviec365.BASE_URL_SEARCH, {
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
