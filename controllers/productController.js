const { RESET_CONTENT } = require('http-status-codes')
const { Products } = require('../models')
const { Op } = require('sequelize')
const fsPromises = require('fs/promises')
const deleteImage = require('../utils/deleteImage')
const addProduct = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('addProducts', { errorMessage: req.errors })
    }
    if (req.file == undefined) {
      return res.render('addProducts', { errorMessage: 'Please add a file' })
    }
    req.body.imageUrl = req.file.filename

    const { title, price, description, imageUrl } = req.body

    if (!title || !price || !description) {
      res.json('Please enter all fields')
    }

    const result = await Products.create({
      title,
      imageUrl,
      price,
      descrption: description,
    })

    res.redirect('/product')
  } catch (err) {
    res.json(err)
  }
}
const allProducts = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('products', { errorMessage: req.errors })
    }
    const { limit, offset } = req.query

    let query = {
      limit: parseInt(limit) || 12,
      offset: parseInt(offset) || 0,
      order: [['createdAt', 'DESC']],
    }
    const products = await Products.findAll(query)
    res.render('products', { products: products })
  } catch (err) {
    res.json(err)
  }
}
const getProduct = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('404error', { errorMessage: req.errors })
    }

    const id = req.params.id
    const query = {
      where: {
        id,
      },
    }
    const product = await Products.findOne(query)
    if (!product) {
      return res.render('404error', { errorMessage: 'Product Not Found .....!' })
    }
    //console.log(product)
    res.render('product', { product: product })
    //res.json(product)
  } catch (err) {
    console.log('producterror', err)
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    if (!req.file) {
      imageUrl = undefined
    }
    if (req.file) {
      imageUrl = req.file.filename
      // const filepath = './public/images/products/' + product.imageUrl
      // const deleteResult = await deleteImage(filepath)
    }

    const { title, price, description } = req.body

    let query = {
      title,
      imageUrl,
      price,
      descrption: description,
    }
    console.log(query)
    const result = await Products.update(query, { where: { id } })
    res.json(result)
  } catch (err) {
    res.json(err)
  }
}

const searchProduct = async (req, res) => {
  try {
    const { search } = req.query
    console.log(search)
    const result = await Products.findAll({
      where: {
        [Op.or]: {
          title: {
            [Op.substring]: `${search}`,
          },
          descrption: {
            [Op.substring]: `${search}`,
          },
        },
      },
    })
    console.log(result)
    res.json(result)
  } catch (err) {
    res.json(err)
  }
}
const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id

    const product = await Products.findOne({
      where: { id },
    })
    if (!product) {
      return res.json('product does not exists')
    }
    const filepath = './public/images/products/' + product.imageUrl
    const result = await Products.destroy({
      where: {
        id,
      },
    })

    const deleteResult = await deleteImage(filepath)
    return res.redirect('/product')
  } catch (err) {}
}

const getAddProductPage = (req, res) => {
  res.render('addproducts')
}

const updateProductPage = async (req, res) => {
  const { id } = req.params
  const product = await Products.findOne({ where: { id } })
  console.log('product', product)
  res.render('updateProduct', { product: product })
}

module.exports = {
  addProduct,
  allProducts,
  getProduct,
  updateProduct,
  searchProduct,
  getAddProductPage,
  deleteProduct,
  updateProductPage,
}
