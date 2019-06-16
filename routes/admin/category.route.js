var express = require('express');
var categoryModel = require('../../models/category.model');
var ParentsCatModel = require('../../models/parentscat.model');
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
  
    
  ParentsCatModel.all().then(rows  => {
    console.log(rows);
    res.render('admin/vwCategories/add',{
      layout:'main_admin.hbs',
      ParentsCategories: rows
    
    })
   
  });
})
router.get('/categories/addParents', (req, res) => {
  res.render('admin/vwCategories/addParents',{
    layout: 'main_admin.hbs'
  });

})
router.post('/categories/addParents', (req, res) => {
  
  ParentsCatModel.add(req.body)
    .then(id => {
      console.log(id);
      res.render('admin/vwCategories/addParents',{
        layout: 'main_admin.hbs'
      });
    }).catch(err => {
      console.log(err);
    })
})


router.post('/categories/add', (req, res) => {
  var entity = {
    
    IDParents: req.body.IDParents,
    NameCategory:req.body.NameCategory,
    
   
  }
  Promise.all([
    categoryModel.add(entity),
    ParentsCatModel.all()
  ]).then(([id,rows])=>{
    res.render('admin/vwCategories/add',{
      layout:'main_admin.hbs',
      ParentsCategories: rows
    });

  }).catch(err => {
      console.log(err);
    })
  
})



router.post('/categories/delete', (req, res) => {
  categoryModel.delete(req.body.IDCategory)
    .then(n => {
        res.redirect('/admin/categories'
      );
    }).catch(err => {
      console.log(err);
    })
})

router.post('/categories/update', (req, res) => {
  categoryModel.update(req.body)
    .then(n => {
      res.redirect('/admin/categories');
    }).catch(err => {
      console.log(err);
    })
})



module.exports = router;
