const urlTopCV = require('../../constant/topCV')
const calculateTime = require('../../util/calculateTime')
const Job = require('../../model/job')
const scraperObject = {
  url: urlTopCV.BASE_URL_TOPCV,
  async scraper(browser, keyword) {
    const timeStart = new Date()
    consola.log({
      message: `Start crawl TopCV at: ${timeStart}`,
      badge: true
    })
    let page = await browser.newPage()
    consola.log({
      message: `Navigating to ${this.url}`,
      badge: true
    })
    // chuyen den trang chu
    await page.goto(urlTopCV.BASE_URL_TOPCV, { waitUntil: 'networkidle2' })
    // chuyen den trang viec lam
    consola.log({
      message: `Navigating to ${urlTopCV.URL_VIEC_LAM_TOPCV}`,
      badge: true
    })
    await page.goto(urlTopCV.URL_VIEC_LAM_TOPCV, {
      waitUntil: 'networkidle2'
    })
    const listResult = []
    // input text to search
    await page.waitForSelector('.search-input input#keyword')
    await (await page.$('input#keyword')).type(keyword)
    await page.keyboard.press('Enter')
    // wait for dom loaded
    await page.waitForNavigation({
      waitUntil: 'networkidle2'
    })
    let countpage = 1
    let maxPage
    let numberPage = await page.$$eval('.pagination > li', listPage => {
      number = listPage.map(el => {
        if (el.querySelector('a')) {
          return el.querySelector('a').innerText
        }
      })
      return number
    })
    maxPage = numberPage.slice(1, -1).pop() ? numberPage.slice(1, -1).pop() : 1

    const urlCurrent = await page.url()
    let urlCurrentToNavigation = urlTopCV.URL_VIEC_LAM_TOPCV
    do {
      const timeStartPage = new Date()
      consola.info({
        message: `crawl page ${countpage} of ${maxPage} of ${keyword}`,
        badge: true
      })
      let checkDataPage =
        (await page.$(
          '#main > div.search-job > div.container > div.list-empty'
        )) || null
      if (checkDataPage) {
        consola.warn({
          message: `page ${countpage} of ${maxPage} of ${keyword} don't have data`,
          badge: true
        })
        break
      } else {
        if (countpage === 1) {
          let job = await getJobBasicInfo(page)
          for (let j = 0; j < job.length; j++) {
            urlCurrentToNavigation = job[j].url
            let jobDetail = await getJobDetail(page, job[j].url, keyword)
            // console.log(jobDetail.dataValues)
            listResult.push(jobDetail)
          }
        } else {
          // check url have ?
          let indexQ = urlCurrent.indexOf('?')
          await page.goto(
            urlCurrent +
              (indexQ < 0 ? `?page=${countpage}` : `&page=${countpage}`),
            {
              waitUntil: 'networkidle2'
            }
          )
          let job = await getJobBasicInfo(page)
          // get job detail
          for (let j = 0; j < job.length; j++) {
            urlCurrentToNavigation = job[j].url
            let jobDetail = await getJobDetail(page, job[j].url, keyword)
            // console.log(jobDetail.dataValues)
            listResult.push(jobDetail)
          }
        }
        countpage++
      }
      const timeEndPage = new Date()
      consola.info({
        message: `End Crawl Page ${countpage - 1} in ${calculateTime(
          timeStartPage,
          timeEndPage
        )}`,
        badge: true
      })
    } while (maxPage === undefined || countpage <= maxPage)
    // reset page
    if (urlCurrentToNavigation.indexOf('brand') < 0) {
      await page.waitForSelector('.search-input input#keyword')
      await (await page.$('input#keyword')).click({ clickCount: 3 })
      await page.keyboard.press('Delete')
    } else {
      await page.goto(urlTopCV.URL_VIEC_LAM_TOPCV, {
        waitUntil: 'networkidle2'
      })
      await page.waitForSelector('.search-input input#keyword')
      await (await page.$('input#keyword')).click({ clickCount: 3 })
      await page.keyboard.press('Delete')
    }
    const timeEnd = new Date()
    consola.log({
      message: `End crawl TopCV at: ${timeEnd}`,
      badge: true
    })
    consola.log({
      message: `crawled ${listResult.length} jobs in ${calculateTime(
        timeStart,
        timeEnd
      )}`,
      badge: true
    })
    return {
      data: listResult,
      time: calculateTime(timeStart, timeEnd)
    }
  }
}

const getJobBasicInfo = async page => {
  const URL = '.search-job .list-job .job-body .job-item .body .title a'
  let checkElement = (await page.$(URL)) || null

  if (checkElement) {
    let job = await page.$$eval(URL, listJob => {
      listJob = listJob.map(item => {
        return {
          url: item.href,
          tenCongViec: item.querySelector('span').innerText
        }
      })
      return listJob
    })
    return job
  } else {
    throw `Check Selector ${URL} in URL: ${page.url()}`
  }
}

/**
 *
 * @param {*} page
 * @param {*} link
 * @returns
 */
const getJobDetail = async (page, link, keyword) => {
  await page.goto(link, {
    waitUntil: 'networkidle2'
  })
  let indexBrand = link.indexOf('brand')
  // console.log(link)
  // get ten cong viec
  let tenCongViec = await getDetail(
    page,
    indexBrand,
    'div.box-info-job h1',
    'h2.title'
  )
  // get ten cong ty
  let tenCongTy = await getTenCongTy(
    page,
    indexBrand,
    '.company-title > a:nth-child(1)',
    '#company-name > h1:nth-child(1)',
    '.box-seo-job-detail > a:nth-child(2)'
  )
  // get muc luong
  let mucLuong = await getDetail(
    page,
    indexBrand,
    '.box-main > div:nth-child(1) > div:nth-child(2) > span:nth-child(3)',
    'div.box-item:nth-child(1) > div:nth-child(2) > span:nth-child(3)'
  )
  // get hinh thuc lam viec
  let hinhThucLamViec = await getDetail(
    page,
    indexBrand,
    '.box-main > div:nth-child(3) > div:nth-child(2) > span:nth-child(3)',
    'div.box-item:nth-child(3) > div:nth-child(2) > span:nth-child(3)'
  )
  // get yeu cau gioi tinh
  let gioiTinh = await getDetail(
    page,
    indexBrand,
    'div.box-item:nth-child(5) > div:nth-child(2) > span:nth-child(3)',
    'div.box-item:nth-child(5) > div:nth-child(2) > span:nth-child(3)'
  )
  // get cap bac
  let capBac = await getDetail(
    page,
    indexBrand,
    'div.box-item:nth-child(4) > div:nth-child(2) > span:nth-child(3)',
    'div.box-item:nth-child(4) > div:nth-child(2) > span:nth-child(3)'
  )
  // get kinh nghiem
  let kinhNghiem = await getDetail(
    page,
    indexBrand,
    'div.box-item:nth-child(6) > div:nth-child(2) > span:nth-child(3)',
    'div.box-item:nth-child(6) > div:nth-child(2) > span:nth-child(3)'
  )
  // get dia diem lam viec
  let diaDiemLamViec = await getDiaDiemLamViec(
    page,
    indexBrand,
    '.box-address > div:nth-child(2) > div:nth-child(1)',
    '.box-address > div:nth-child(2) > div:nth-child(1)',
    'li.text-dark-gray:nth-child(1)'
  )
  // handle dia diem lam viec
  let diaDiemLamViecArr = diaDiemLamViec.split(': ')
  // get career
  let career = await getCareer(page, indexBrand)
  // get id cong viec
  let idCongViec = await page.url()
  idCongViec = idCongViec.split('.html')
  for (let i = idCongViec[0].length - 1; i >= 0; i--) {
    if (isNaN(idCongViec[0][i])) {
      idCongViec = idCongViec[0].slice(i + 1, idCongViec[0].length)
      break
    }
  }
  return new Job({
    idCongViec,
    tenCongViec,
    tenCongTy,
    mucLuong,
    mucLuongMin: '',
    mucLuongMax: '',
    hinhThucLamViec,
    gioiTinh,
    capBac,
    kinhNghiem,
    diaDiemLamViec: diaDiemLamViecArr[1],
    urlImgCompany: '',
    addressCompany: '',
    nganhNghe: career.join('; '),
    web: 'topcv.vn',
    keywordSearch: keyword
  })
  // return {
  //   idCongViec,
  //   tenCongViec,
  //   tenCongTy,
  //   mucLuong,
  //   mucLuongMin: '',
  //   mucLuongMax: '',
  //   hinhThucLamViec,
  //   gioiTinh,
  //   capBac,
  //   kinhNghiem,
  //   diaDiemLamViec: diaDiemLamViecArr[1],
  //   urlImgCompany: '',
  //   addressCompany: '',
  //   nganhNghe: career.join('; '),
  //   web: 'topcv.vn'
  // }
}

const getDetail = async (page, indexBrand, selectorNoBrand, selectorBrand) => {
  if (indexBrand < 0) {
    // don't have brand
    let checkElement = (await page.$(selectorNoBrand)) || null
    if (checkElement) {
      const element = await page.waitForSelector(selectorNoBrand)
      const value = await element.evaluate(el => el.textContent)
      return value.trim()
    } else {
      throw `Check Selector ${selectorNoBrand} in URL: ${page.url()}`
    }
  } else {
    // brand
    let checkElement = (await page.$(selectorBrand)) || null
    if (checkElement) {
      const element2 = await page.waitForSelector(selectorBrand)
      const value2 = await element2.evaluate(el => el.textContent)
      return value2.trim()
    } else {
      throw `Check Selector ${selectorBrand} in URL: ${page.url()}`
    }
  }
}

const getDiaDiemLamViec = async (
  page,
  indexBrand,
  selectorNoBrand,
  selectorBrand1,
  selectorBrand2
) => {
  if (indexBrand < 0) {
    // don't have brand
    let checkElement = (await page.$(selectorNoBrand)) || null
    if (checkElement) {
      const element = await page.waitForSelector(selectorNoBrand)
      const value = await element.evaluate(el => el.textContent)
      return value.trim()
    } else {
      throw `Check Selector ${selectorNoBrand} in URL: ${page.url()}`
    }
  } else {
    // brand
    let checkElement = (await page.$(selectorBrand1)) || null
    if (checkElement) {
      const element2 = await page.waitForSelector(selectorBrand1)
      const value2 = await element2.evaluate(el => el.textContent)
      return value2.trim()
    } else {
      let checkElement2 = (await page.$(selectorBrand2)) || null
      if (checkElement2) {
        const element3 = await page.waitForSelector(selectorBrand2)
        const value3 = await element3.evaluate(el => el.textContent)
        return value3.trim()
      } else {
        throw `Check Selector ${selectorBrand1} or Selector ${selectorBrand2} in URL: ${page.url()}`
      }
    }
  }
}

const getTenCongTy = async (
  page,
  indexBrand,
  selectorNoBrand,
  selectorBrand1,
  selectorBrand2
) => {
  if (indexBrand < 0) {
    // don't have brand
    let checkElement = (await page.$(selectorNoBrand)) || null
    if (checkElement) {
      const element = await page.waitForSelector(selectorNoBrand)
      const value = await element.evaluate(el => el.textContent)
      return value.trim()
    } else {
      throw `Check Selector ${selectorNoBrand} in URL: ${page.url()}`
    }
  } else {
    // brand
    let checkElement = (await page.$(selectorBrand1)) || null
    if (checkElement) {
      const element2 = await page.waitForSelector(selectorBrand1)
      const value2 = await element2.evaluate(el => el.textContent)
      return value2.trim()
    } else {
      let checkElement2 = (await page.$(selectorBrand2)) || null
      if (checkElement2) {
        const element3 = await page.waitForSelector(selectorBrand2)
        const value3 = await element3.evaluate(el => el.textContent)
        return value3.trim()
      } else {
        throw `Check Selector ${selectorBrand1} or Selector ${selectorBrand2} in URL: ${page.url()}`
      }
    }
  }
}

// get career
const getCareer = async (page, indexBrand) => {
  let career = []
  if (indexBrand < 0) {
    // don't have brand
    let job = await page.$$eval('.keyword > span', listCareer => {
      listCareer = listCareer.map(item => {
        return item.innerText
      })
      return listCareer
    })
    career = job
  } else {
    // brand
    let job = await page.$$eval(
      'div.mb-20:nth-child(6) > span > a',
      listCareer => {
        listCareer = listCareer.map(item => {
          return item.innerText
        })
        return listCareer
      }
    )
    career = job
  }
  return career
}
module.exports = scraperObject
