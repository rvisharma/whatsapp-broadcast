const puppeteer = require('puppeteer')
const toMS = require('@sindresorhus/to-milliseconds')

const { getConfig } = require('./config')
const SELECTORS = require('./selectors')
const { sendMessages } = require('./messaging')

const start = async () => {
  let browser
  try {
    console.time('Time')

    browser = await puppeteer.launch({
      headless: false,
    })

    const page = await browser.newPage()

    await page.goto('https://web.whatsapp.com/', {
      timeout: toMS({ minutes: 5 }),
      waitUntil: 'networkidle2',
    })
    await page.waitForSelector(SELECTORS.SEARCH_BOX, { timeout: toMS({ minutes: 5 }) })
    await sendMessages(page, getConfig())
  } catch (error) {
    console.error(error)
  } finally {
    console.timeEnd('Time')
    browser && (await browser.close())
  }
}

start()
