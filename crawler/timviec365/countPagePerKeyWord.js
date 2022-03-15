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
    // wait for dom loaded
    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    })
    let countPage = 1
    let endPage = true
    let maxPage = 0
    const urlCurrent = await page.url()
    let canCrawl = true

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
    // while (endPage) {
    //   // check keyword have data
    //   let checkDataPage = (await page.$('.main_cate .item_cate')) || null
    //   if (checkDataPage) {
    //     // go back page
    //     const urlToBack = await page.url()
    //     await page.goto(urlToBack, {
    //       waitUntil: 'networkidle2'
    //     })
    //     // check end page
    //     let element = (await page.$('.clr .next')) || null
    //     endPage = element ? true : false
    //     // console.log(page.url())
    //     // console.log(countPage)
    //     maxPage++
    //   } else {
    //     endPage = false
    //     if (countPage === 1) {
    //       canCrawl = false
    //     }
    //   }
    //   if (endPage) {
    //     if (urlCurrent.includes('keyword')) {
    //       await page.goto(
    //         urlViecLam365.BASE_URL_SEARCH + `${keyword}&page=${countPage + 1}`,
    //         {
    //           waitUntil: 'networkidle2'
    //         }
    //       )
    //     } else {
    //       await page.goto(urlCurrent + `?page=${countPage + 1}`, {
    //         waitUntil: 'networkidle2'
    //       })
    //     }
    //     countPage++
    //   }
    // }
    console.log({ maxPage, canCrawl })
    return { maxPage, canCrawl }
  }
}

module.exports = scraperObject
