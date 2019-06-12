var express = require('express');
var categoryModel = require('../../models/category.model');

var router = express.Router();

router.get('/', (req, res) => {

    
  var p = categoryModel.all();
  p.then(rows => {
    
    res.render('admin/vwCategories/index', {
      categories: rows
    });
  }).catch(err => {
    console.log(err);
  });
})

router.get('/edit/:id', (req, res) => {
  var id = req.params.id;
  if (isNaN(id)) {
    res.render('admin/vwCategories/edit', { error: true });
    return;
  }

  categoryModel.single(id).then(rows => {
    if (rows.length > 0) {
      res.render('admin/vwCategories/edit', {
        error: false,
        category: rows[0]
      });
    } else {
      res.render('admin/vwCategories/edit', { error: true });
    }
  }).catch(err => {
    console.log(err);
  });
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

router.post('/update', (req, res) => {
  categoryModel.update(req.body)
    .then(n => {
      res.redirect('/admin/categories');
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
