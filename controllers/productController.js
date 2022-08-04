const { Products } = require('../models')

const addProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body
    if (!title || !price || !description) {
      return res.json('please enter all fields')
    }
    const result = await Products.create({
      title,
      imageUrl: req.file.filename,
      price,

      descrption: description,
    })
    res.json(result)
  } catch (err) {
    res.json(err)
  }
}
const allProducts = async (req, res) => {
  try {
    const result = await Products.findAll()

    res.json(result)
  } catch (err) {
    res.json(err)
  }
}

module.exports = {
  addProduct,
  allProducts,
}
