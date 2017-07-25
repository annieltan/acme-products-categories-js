const express = require('express');
const app = express();
const port = 3000;
const nunjucks = require('nunjucks');
const categories = require('./routes/categories');
const bodyParser = require('body-parser');
const db = require('./db');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/categories', categories);

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views', {noCache: true});

app.get('/', function(req, res, next){
  res.render('index', {getCategories: db.getCategoryNames(),
                       buttonIsCategory: true})
})

app.listen(port, function(req, res, next){
  console.log(res)
});
