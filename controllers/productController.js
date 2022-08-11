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
    res.render('500error')
  }
}
const allProducts = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('products', { errorMessage: req.errors })
    }
    let { limit, page, search } = req.query

    limit = parseInt(limit) || 12
    page = parseInt(page) || 1
    let _search = search || ''
    page = Math.abs(page)
    let offset = page * limit - limit
    let query
    let count
    if (!search) {
      query = {
        limit: Math.abs(limit),
        offset: offset,
        order: [['createdAt', 'DESC']],
      }
      count = await Product.count()
    }
    if (search) {
      query = {
        where: {
          [Op.or]: {
            title: {
              [Op.substring]: `${_search}`,
            },
            description: {
              [Op.substring]: `${_search}`,
            },
          },
        },
        limit: Math.abs(limit),
        offset: offset,
        order: [['createdAt', 'DESC']],
      }
      count = await Product.count({
        where: {
          [Op.or]: {
            title: {
              [Op.substring]: `${_search}`,
            },
            description: {
              [Op.substring]: `${_search}`,
            },
          },
        },
      })
    }

    const products = await Product.findAll(query)

    res.render('products', { products: products, pagination: { count, limit, page } })
  } catch (err) {
    res.render('500error')
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
    res.render('product', { product: product })
  } catch (err) {
    res.render('500error')
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
  } catch (err) {
    res.render('500error')
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
    res.render('500error')
  }
}

const getAddProductPage = (req, res) => {
  res.render('addproducts')
}

const updateProductPage = async (req, res) => {
  try {
    const { id } = req.params
    const product = await Product.findOne({ where: { id } })

    res.render('updateProduct', { product: product })
  } catch (err) {
    res.render('500error')
  }
}

module.exports = {
  addProduct,
  allProducts,
  getProduct,
  updateProduct,
  getAddProductPage,
  deleteProduct,
  updateProductPage,
}
