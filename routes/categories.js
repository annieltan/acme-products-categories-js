const express = require('express');
const router = express.Router();
const db = require('../db');
const methodOverride = require('method-override');

router.use(methodOverride('_method'))
router.use(function(req, res, next){
  if (req.query._method == 'DELETE'){
    console.log('found delete', req.method, req.url, req.path);
    req.method = 'DELETE';
    req.url = req.path;
  }
  next();
});

router.get('/:name/products/', function(req, res, next){
  let name = req.params.name;
  let products = db.getProductsByCategory(name);
  let categories = db.getCategoryNames();
  res.render('products', {getCategories: categories,
                          getProducts: products,
                          buttonIsProduct: true,
                          category: name})
});

router.post('/', function(req, res, next){
  var category = req.body.category;
  db.createCategory(category)
  res.redirect('/')
});

router.delete('/:name/', function(req, res, next){
  var category = req.url.split('/')[1]
  db.deleteCategory(category);
  res.redirect('/')
});

router.post('/:name/products/', function(req, res, next){
  var category = req.params.name;
  var product = req.body.product;
  db.createProduct(category, product);
  res.redirect("/categories" + req.url)
});

router.delete('/:name/products/:id', function(req, res, next){
  var category = req.url.split('/')[1];
  var id = req.url.split('/')[3];
  db.deleteProduct(category, id)
  res.redirect('/');
});

module.exports = router;
