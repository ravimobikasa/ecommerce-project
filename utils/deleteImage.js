const fsPromises = require('fs/promises')

const deleteImage = async (filePath) => {
  try {
    await fsPromises.unlink(filePath)
    return true
  } catch (err) {
    return false
  }
}

module.exports = deleteImage
