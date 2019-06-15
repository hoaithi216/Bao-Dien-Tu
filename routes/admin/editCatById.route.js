var express = require('express');
const router = express.Router();
var categoryModel = require('../../models/category.model');


router.use(express.static('public'));

router.get('/:id', (req, res) => {
    var id = req.params.id;
    if (isNaN(id)) {
      res.render('admin/vwCategories/edit', { 
          error: true,
          layout:'main_admin.hbs'
     });
      return;
    }
  
    categoryModel.single(id).then(rows => {
     
      if (rows.length > 0) {
        res.render('admin/vwCategories/edit', {
            layout:'main_admin.hbs',
          error: false,
          category: rows[0]
        });
      } else {
        res.render('admin/vwCategories/edit',
         { error: true,
            layout:'main_admin.hbs'
        
        
        });
      }
    }).catch(err => {
      console.log(err);
    });
  })
  router.post('/update', (req, res) => {
    categoryModel.update(req.body)
      .then(n => {
        res.redirect('/admin/categories');
      }).catch(err => {
        console.log(err);
      })
  })
  module.exports= router ;