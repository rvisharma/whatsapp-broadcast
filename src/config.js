const fs = require('fs')
const path = require('path')

const getConfig = () => {
  const message = fs
    .readFileSync(path.join(__dirname, '../config/message.txt'))
    .toString()
    .split('\n')

  const numbers = fs
    .readFileSync(path.join(__dirname, '../config/numbers.txt'))
    .toString()
    .split('\n')

  return {
    numbers,
    message,
  }
}

module.exports = {
  getConfig,
}
