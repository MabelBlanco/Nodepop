var express = require('express');
var router = express.Router();

const advertisements = [
  {
    name: 'Bicicleta',
    sale: true,
    price: 230.15, 
    photo: 'http://localhost:3000/images/bicicleta.jpg',
    tags: ['lifestyle', 'motor']
  },
  {
    name: 'iPhone 3GS',
    sale: false,
    price: 50.00, 
    photo: 'http://localhost:3000/images/iphone3gs.jpg',
    tags: ['lifestyle', 'mobile']
  }
]

/* GET home page. */
router.get('/', function(req, res, next) {

  res.locals.advertisements = advertisements

  res.render('index', { title: 'Anuncios' });
});

router.get ('/tags', (req, res, next) => {
  res.send ('Las etiquetas que se pueden utilizar son:')
})

module.exports = router;
