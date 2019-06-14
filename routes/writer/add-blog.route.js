var express = require('express');
var moment = require('moment');
var blogModel = require('../../models/blog.model');
var categoryModel = require('../../models/category.model');

var router = express.Router();

router.get("/", (req, res) => {
    var p = categoryModel.all();
    p.then(rows => {
        res.render('writer/add-blog', {
            title: "add-content",
            layout: "../../views/_layouts/baseview-writer.hbs",
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/', (req, res) => {
    var currdate = moment().format('YYYY-MM-DD');
    console.log(req.body);
    var entity = {
        IDCategory: req.body.IDCategory,
        DateProduct: currdate,
        Tittle: req.body.Tittle,
        Context: req.body.Context,
        SortContext: req.body.SortContext,
        AvatarBlog: req.body.avatar
    }
    blogModel.add(entity)
    .then(id => {
        console.log(id);
        res.render('writer/add-blog', {
            title: "add-content",
            layout: "../../views/_layouts/baseview-writer.hbs"
        });
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;