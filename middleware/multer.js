const express = require('express')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: '../public/images/products',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
}).single('myImage')

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())

  const mimetype = filetypes.test(file.mimetype)

  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}

const app = express()

// app.use(express.static('./public'))

app.post('/upload', (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.send({
        msg: err,
      })
    } else {
      if (req.file == undefined) {
        res.send({
          msg: 'Error: No File Selected!',
        })
      }
      //else {
      // res.send({
      //   msg: 'File Uploaded!',
      //   file: `uploads/${req.file.filename}`,
      // })
      //}
    }
  })
  next()
})
const uplaodData = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.send({
        msg: err,
      })
    } else {
      if (req.file == undefined) {
        res.send({
          msg: 'Error: No File Selected!',
        })
      }
      // else {
      // res.send({
      //   msg: 'File Uploaded!',
      //   file: `uploads/${req.file.filename}`,
      // })
      // }
    }
  })
  next()
}

const port = 4000

app.listen(port, () => console.log(`Server started on port ${port}`))
