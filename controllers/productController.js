const { RESET_CONTENT } = require('http-status-codes')
const { Product } = require('../models')
const { Op } = require('sequelize')
const fsPromises = require('fs/promises')
const deleteImage = require('../utils/deleteImage')
const addProduct = async (req, res) => {
  try {
    if (req.file == undefined) {
      return res.render('addProducts', { formData: req.body, errorMessage: 'Please add a valid file' })
    }
    if (req.errors) {
      return res.render('addProducts', { formData: req.body, errorMessage: req.errors })
    }

    req.body.imageUrl = req.file.filename

    const { title, price, description, imageUrl } = req.body

    if (!title || !price || !description) {
      res.json('Please enter all fields')
    }

    const result = await Product.create({
      title,
      imageUrl,
      price,
      description,
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
      limit: parseInt(limit) || 24,
      offset: parseInt(offset) || 0,
      order: [['createdAt', 'DESC']],
    }
    const products = await Product.findAll(query)
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
    const product = await Product.findOne(query)
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

    if (req.errors) {
      const product = await Product.findOne({
        where: {
          id,
        },
      })
      return res.render('updateProduct', { errorMessage: req.errors, product: product })
    }

    if (!req.file) {
      imageUrl = undefined
    }
    if (req.file) {
      const product = await Product.findOne({
        where: { id },
      })

      const deletePath = product.imageUrl

      imageUrl = req.file.filename

      const filepath = './public/images/products/' + deletePath
      const deleteResult = await deleteImage(filepath)
    }

    const { title, price, description } = req.body

    let query = {
      title,
      imageUrl,
      price,
      description,
    }

    const result = await Product.update(query, { where: { id } })
    return res.redirect(`/product/${id}`)
    //res.json(result)
  } catch (err) {
    res.json(err)
  }
}

const searchProduct = async (req, res) => {
  try {
    const { search } = req.query
    console.log(search)
    const result = await Product.findAll({
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

    const product = await Product.findOne({
      where: { id },
    })
    if (!product) {
      return res.json('product does not exists')
    }
    const filepath = './public/images/products/' + product.imageUrl
    const result = await Product.destroy({
      where: {
        id,
      },
    })

    const deleteResult = await deleteImage(filepath)
    return res.redirect('/product')
  } catch (err) {
    res.json(err)
  }
}

const getAddProductPage = (req, res) => {
  res.render('addproducts')
}

const updateProductPage = async (req, res) => {
  const { id } = req.params
  const product = await Product.findOne({ where: { id } })

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
