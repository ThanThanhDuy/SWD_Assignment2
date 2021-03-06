const puppeteer = require('puppeteer')

async function startBrowser() {
  let browser
  try {
    browser = await puppeteer.launch({
      // set headless to false to see browser
      headless: true,
      args: ['--disable-setuid-sandbox', '--window-size=1920,1080'],
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1920,
        height: 1080
      }
    })
  } catch (err) {
    console.log('Could not create a browser instance => : ', err)
  }
  return browser
}

module.exports = {
  startBrowser
}
