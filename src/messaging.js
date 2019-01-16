const SELECTORS = require('./selectors')

// Type mobile number
async function selectUser(page, userNumber) {
  await page.waitFor(SELECTORS.SEARCH_BOX)
  await page.type(SELECTORS.SEARCH_BOX, userNumber)
  await page.keyboard.press('Enter')
}

async function typeMessage(page, messages) {
  for (const message of messages) {
    if (!message) {
      continue
    }

    await page.waitForSelector(SELECTORS.INPUT_MESSAGE_BOX)
    await page.type(SELECTORS.INPUT_MESSAGE_BOX, message)

    if (messages.length > 1) {
      await page.keyboard.down('Shift')
      await page.keyboard.press('Enter')
      await page.keyboard.up('Shift')
    }
  }
  await page.keyboard.press('Enter')
}

const sendMessages = async (page, config) => {
  console.time(`Time spent in sending ${config.numbers.length} messages`)

  for (const userNumber of config.numbers) {
    if (!userNumber) {
      continue
    }
    await selectUser(page, userNumber)
    await typeMessage(page, config.message)
  }
  console.timeEnd(`Time spent in sending ${config.numbers.length} messages`)
}

module.exports = {
  sendMessages,
}
