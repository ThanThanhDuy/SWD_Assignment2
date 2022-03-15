const urlViecLam365 = require('../../constant/timviec365')
const calculateTime = require('../../util/calculateTime')
const scraperObject = {
  url: urlViecLam365.BASE_URL,
  async scraper(browser, keyword) {
    const timeStart = new Date()
    consola.log({
      message: `Start crawl timviec365 at: ${timeStart}`,
      badge: true
    })
    let page = await browser.newPage()
    consola.log({
      message: `Navigating to ${this.url}`,
      badge: true
    })
    // chuyen den trang chu
    await page.goto(urlViecLam365.BASE_URL, { waitUntil: 'networkidle2' })
    // const listSearch = keyword.LIST_SEARCH_TIMVEIC365

    // chuyen den trang viec lam
    consola.log({
      message: `Navigating to ${urlViecLam365.BASE_URL_SEARCH}`,
      badge: true
    })
    await page.goto(urlViecLam365.BASE_URL_SEARCH, {
      waitUntil: 'networkidle2'
    })
    const listResult = []
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
    const urlCurrent = await page.url()
    while (endPage) {
      // get job basic info
      consola.ready({
        message: `crawl page ${countPage} of ${keyword}`,
        badge: true
      })
      // check keyword have data
      let checkDataPage = (await page.$('.main_cate .item_cate')) || null
      if (checkDataPage) {
        let job = await getJobBasicInfo(page)
        // get job detail
        const urlToBack = await page.url()
        if (job.length > 0) {
          for (let j = 0; j < job.length; j++) {
            urlCurrentToNavigation = job[j].url
            let jobDetail = await getJobDetail(page, job[j].url)
            jobDetail = { ...jobDetail, keywordSearch: keyword }
            console.log(jobDetail)
            listResult.push(jobDetail)
          }
        }
        // go back page
        await page.goto(urlToBack, {
          waitUntil: 'networkidle2'
        })
        // check end page
        let element = (await page.$('.clr .next')) || null
        endPage = element ? true : false
        console.log(job)
        // change page
      } else {
        endPage = false
        consola.warn({
          message: `page ${countPage} of ${listSearch[i]} don't have data`,
          badge: true
        })
      }
      if (endPage) {
        if (urlCurrent.includes('keyword')) {
          await page.goto(
            urlViecLam365.BASE_URL_SEARCH +
              `${listSearch[i]}&page=${countPage + 1}`,
            {
              waitUntil: 'networkidle2'
            }
          )
        } else {
          await page.goto(urlCurrent + `?page=${countPage + 1}`, {
            waitUntil: 'networkidle2'
          })
        }
        countPage++
      }
    }
    await page.waitForSelector('.box_m_search input#fts_id')
    await (await page.$('.box_m_search input#fts_id')).click({ clickCount: 3 })
    await page.keyboard.press('Delete')

    /**
     * End crawl timviec365
     */
    const timeEnd = new Date()
    // console.log(listResult)
    consola.log({
      message: `End crawl timviec365 at: : ${timeEnd}`,
      badge: true
    })
    consola.log({
      message: `crawled ${listResult.length} jobs in ${calculateTime(
        timeStart,
        timeEnd
      )}`,
      badge: true
    })
  }
}

const getJobBasicInfo = async page => {
  let job = await page.$$eval('div.center_cate > div > h3 > a', listJob => {
    listJob = listJob.map(item => {
      return {
        url: item.href
      }
    })
    return listJob
  })
  return job
}

/**
 *
 * @param {*} page
 * @param {*} link
 * @returns
 */
const getJobDetail = async (page, link) => {
  await page.goto(link, {
    waitUntil: 'networkidle2'
  })
  // console.log(link)
  // get ten cong viec
  let tenCongViec = await getDetail(
    page,
    'div.box_titi > div > div > div.right_tit > h1'
  )
  // get ten cong ty
  let tenCongTy = await getDetail(
    page,
    'div.box_titi > div > div > div.right_tit > a'
  )
  // get muc luong
  let mucLuong = await getDetail(page, 'p.lv_luong > span')
  // get dia diem lam viec
  let diaDiemLamViec = await getDetail(
    page,
    'div.box_titi > div > div > div.right_tit > p:nth-child(4) > a',
    '.box-address > div:nth-child(2) > div:nth-child(1)'
  )
  let idCongViec = await page.waitForSelector(
    'div.box_titi > div > div > div.right_tit > h1'
  )
  idCongViec = await idCongViec.evaluate(node => node.getAttribute('data-id'))

  /**
   * get detail 365
   *
   */
  let jobDetailTmp = await page.$$eval('.box_tomtat_2 p', list => {
    list = list.map(el => el.innerText)
    return list
  })
  // console.log(jobDetailTmp)
  listItem = []
  for (let i = 0; i < jobDetailTmp.length; i++) {
    let item = jobDetailTmp[i].split(': ')
    switch (item[0]) {
      case '- Hình thức làm việc':
        listItem.push(item[1].trim())
        break
      case '- Yêu cầu giới tính':
        listItem.push(item[1].trim())
        break
      case '- Chức vụ':
        listItem.push(item[1].trim())
        break
      case '- Kinh nghiệm':
        listItem.push(item[1].trim())
        break
      case '- Ngành nghề':
        listItem.push(item[1].trim())
        break
    }
  }

  return {
    idCongViec,
    tenCongViec,
    tenCongTy,
    mucLuong,
    hinhThucLamViec: listItem[0],
    gioiTinh: listItem[1],
    capBac: listItem[2],
    kinhNghiem: listItem[3],
    diaDiemLamViec,
    urlImgCompany: '',
    addressCompany: '',
    nganhNghe: listItem[4],
    web: 'timviec365.vn'
  }
}

const getDetail = async (page, selector) => {
  const element = await page.waitForSelector(selector)
  const value = await element.evaluate(el => el.textContent)
  return value.trim()
}

module.exports = scraperObject
