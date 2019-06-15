var express = require('express');
var categoryModel = require('../../models/category.model');
const editCatById = require('./editCatById.route')


var router = express.Router();

require('../../middlewares/sesson')(router);
router.use(express.static('public'));

router.get('/categories', (req, res, next)=>{
  var p = categoryModel.all();
  p.then(rows => {
    
    res.render('./admin/vwCategories/manageCat',{
      layout:'main_admin.hbs',
      categories: rows,
       });
    
    

  }).catch(err => {
  
    })
})
router.use('/categories/edit', function(req, res, next) {
  idCat = req.params.id;
  next()
},editCatById)
  


router.get('/categories/add', (req, res) => {
  res.render('admin/vwCategories/add',{
    layout:'main_admin.hbs',
  });
})

router.post('/categories/add', (req, res) => {
  categoryModel.add(req.body)
    .then(id => {
      console.log(id);
      res.render('admin/vwCategories/add',{
        layout:'main_admin.hbs',
      });
    }).catch(err => {
      console.log(err);
    })
})



router.post('/categories/delete', (req, res) => {
  categoryModel.delete(req.body.CatID)
    .then(n => {
      res.redirect('/admin/categories',{
        layout:'main_admin.hbs',
      });
    }).catch(err => {
      console.log(err);
    })
})
router.get('/add', (req, res) => {
  res.render('admin/vwCategories/add');
})

router.post('/add', (req, res) => {
  categoryModel.add(req.body)
    .then(id => {
      console.log(id);
      res.render('admin/vwCategories/add');
    }).catch(err => {
      console.log(err);
    })
})

router.post('/delete', (req, res) => {
  categoryModel.delete(req.body.CatID)
    .then(n => {
      res.redirect('/admin/categories');
    }).catch(err => {
      console.log(err);
    })
})


module.exports = router;
