const urlViecLam365 = require('../../constant/timviec365')
const scraperObject = {
  url: urlViecLam365.BASE_URL,
  async scraper(browser, keyword) {
    let page = await browser.newPage()
    consola.log({
      message: `Estimate ${keyword}`,
      badge: true
    })
    // chuyen den trang chu
    await page.goto(urlViecLam365.BASE_URL, { waitUntil: 'networkidle2' })

    // chuyen den trang viec lam
    await page.goto(urlViecLam365.BASE_URL_SEARCH, {
      waitUntil: 'networkidle2'
    })
    // input text to search
    await page.waitForSelector('.box_m_search input#fts_id')
    await (await page.$('.box_m_search input#fts_id')).type(keyword)
    await page.keyboard.press('Enter')
    // wait for web loaded
    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    })

    let maxPage = 0
    let canCrawl = true
    /**
     * step 1: kiem tra xem cos button de den last page hay k
     * - yes: chuyen den last page va lay count page hien tai(last page)
     * - No: kiem co btn next hay k
     *    > yes: next den khi k con btn page nua -> get last page
     *    > No: kiem tra co last page hay k
     *        > yes: get last page
     *        > No: return key word not have data -> don't need crawl
     */
    let checkHaveLastPage = (await page.$('.last')) || null
    if (checkHaveLastPage) {
      await page.waitForSelector('.last')
      await (await page.$('.last')).click({ clickCount: 1 })
      const element = await page.waitForSelector('.jp-current')
      maxPage = await element.evaluate(el => el.textContent)
    } else {
      let checkHaveNextPage = (await page.$('.next')) || null
      while (checkHaveNextPage) {
        await page.waitForSelector('.next')
        await (await page.$('.next')).click({ clickCount: 1 })
        checkHaveNextPage = (await page.$('.next')) || null
      }
      let checkHavePageCurrent = (await page.$('.jp-current')) || null
      if (checkHavePageCurrent) {
        const element = await page.waitForSelector('.jp-current')
        maxPage = await element.evaluate(el => el.textContent)
      } else {
        maxPage = 0
        canCrawl = false
      }
    }
    console.log({ maxPage, canCrawl })
    return { maxPage, canCrawl }
  }
}

module.exports = scraperObject
