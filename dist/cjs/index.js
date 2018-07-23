'use strict'
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./rematch.min.js')
} else {
  module.exports = require('./rematch.js')
}
