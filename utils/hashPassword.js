const bcrypt = require('bcryptjs')

const DEFAULT_SALT_LENGTH = 10

function generateHash(payload, salt) {
  return bcrypt.hash(payload, salt | DEFAULT_SALT_LENGTH)
}

module.exports = {
  generateHash,
}
