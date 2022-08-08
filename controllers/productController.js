const { Products } = require('../models')

const addProduct = async (req, res) => {
  try {
    req.body.imageUrl = req.file.filename
    const { title, price, description, imageUrl } = req.body
    const result = await Products.create({
      title,
      imageUrl,
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
    const { limit, offset } = req.query

    let query = {
      limit: parseInt(limit) || 6,
      offset: parseInt(offset) || 0,
      order: [['createdAt', 'DESC']],
    }
    const result = await Products.findAll()
    res.render('products', { products: result })
  } catch (err) {
    res.json(err)
  }
}
const getProduct = async (req, res) => {
  try {
    const id = req.params.id
    const query = {
      where: {
        id,
      },
    }
    const result = await Products.findOne(query)
    res.json(result)
  } catch (err) {
    res.jon(err)
  }
}

const updateProduct = async (req, res) => {
  try {
    const { title, price, description } = req.body

    const id = req.params.id

    let query = {
      title,
      imageUrl: req.file.filename,
      price,
      descrption: description,
    }
    const result = await Products.update(query, { where: id })

    res.json(result)
  } catch (err) {
    res.json(err)
  }
}
module.exports = {
  addProduct,
  allProducts,
  getProduct,
  updateProduct,
}
