const { RESET_CONTENT } = require('http-status-codes')
const { Product } = require('../models')
const { Op } = require('sequelize')
const deleteImage = require('../utils/deleteImage')

const addProduct = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('addProducts', { formData: req.body, errorMessage: req.errors })
    }
    if (req.file == undefined) {
      return res.render('addProducts', { formData: req.body, errorMessage: 'Please add a valid file' })
    }

    req.body.imageUrl = req.file.filename

    const { title, price, description, imageUrl } = req.body
    const { id: createdBy } = req.user

    if (!title || !price || !description) {
      res.json('Please enter all fields')
    }

    const result = await Product.create({
      title,
      imageUrl,
      price,
      description,
      createdBy,
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
          },
        },
      })
    }

    const products = await Product.findAll(query)

    res.render('products', { products: products, pagination: { count, limit, page, search } })
  } catch (err) {
    res.render('500error')
  }
}
const myProducts = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('products', { errorMessage: req.errors })
    }
    const { id: userId } = req.user
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
        where: {
          createdBy: userId,
        },
        limit: Math.abs(limit),
        offset: offset,
        order: [['createdAt', 'DESC']],
      }
      count = await Product.count({
        where: {
          createdBy: userId,
        },
      })
    }
    let searchQuery = {
      createdBy: userId,
      [Op.or]: {
        title: {
          [Op.substring]: `${_search}`,
        },
      },
    }
    if (search) {
      query = {
        where: searchQuery,
        limit: Math.abs(limit),
        offset: offset,
        order: [['createdAt', 'DESC']],
      }
      count = await Product.count({
        where: searchQuery,
      })
    }

    const products = await Product.findAll(query)
    //return res.json(products)
    return res.render('products', { products: products, pagination: { count, limit, page, search } })
  } catch (err) {
    //return res.json(err)
    return res.render('500error')
  }
}
const getProduct = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('404error', { errorMessage: req.errors })
    }
    const { id: userId } = req.user

    const id = req.params.id
    const query = {
      where: {
        id,
      },
    }
    const product = await Product.findOne(query)
    let canEdit = false

    if (userId == product.createdBy) {
      canEdit = true
    }

    if (!product) {
      return res.render('404error', { errorMessage: 'Product Not Found .....!' })
    }
    res.render('product', { product: product, canEdit })
  } catch (err) {
    return res.render('500error')
  }
}

const updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const { id: userId } = req.user

    if (req.errors) {
      const product = await Product.findOne({
        where: {
          id,
        },
      })
      return res.render('updateProduct', { errorMessage: req.errors, product: product })
    }

    const product = await Product.findOne({
      where: {
        id,
      },
    })

    if (userId != product.createdBy) {
      return res.render('product', { errorMessage: 'You can only edit your own products', product: product, canEdit: false })
    }

    if (!req.file) {
      imageUrl = undefined
    }
    if (req.file) {
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
    const { id: userId } = req.user
    const product = await Product.findOne({
      where: { id },
    })

    if (!product) {
      return res.json('product does not exists')
    }
    if (userId != product.createdBy) {
      return res.render('product', { errorMessage: 'You can only delete your own products', product: product })
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
    const { id: userId } = req.user

    const product = await Product.findOne({ where: { id } })
    if (userId != product.createdBy) {
      return res.render('product', { product, errorMessage: 'You can only update your own products', canEdit: false })
    }

    return res.render('updateProduct', { product: product })
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
  myProducts,
}
