const routeNotFound = (req, res, next) => {
  res.render('404error')
}

module.exports = routeNotFound
