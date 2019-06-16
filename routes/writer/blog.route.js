var express = require('express');
var moment = require('moment');
var blogModel = require('../../models/blog.model');
var categoryModel = require('../../models/category.model');

var router = express.Router();

router.get("/", (req, res) => {
    res.redirect('/writer/blog/publishing');
})

router.get("/publishing", (req, res) => {
    var iduser = res.locals.authUser.IDUser;
    var statuseditor = 1;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        res.render('writer/publishing-blog', {
            title: "view-blog-list",
            layout: "../../views/_layouts/baseview-writer.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/published", (req, res) => {
    var iduser = res.locals.authUser.IDUser;
    var statuseditor = 2;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        res.render('writer/published-blog', {
            title: "view-blog-list",
            layout: "../../views/_layouts/baseview-writer.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/refused", (req, res) => {
    var iduser = res.locals.authUser.IDUser;
    var statuseditor = 3;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        res.render('writer/refused-blog', {
            title: "view-blog-list",
            layout: "../../views/_layouts/baseview-writer.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/pending", (req, res) => {
    var iduser = res.locals.authUser.IDUser;
    var statuseditor = 4;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        res.render('writer/pending-blog', {
            title: "view-blog-list",
            layout: "../../views/_layouts/baseview-writer.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/add", (req, res) => {
    var p = categoryModel.all();
    p.then(rows => {
        res.render('writer/add-blog', {
            title: "add-blog",
            layout: "../../views/_layouts/baseview-writer.hbs",
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/add', (req, res) => {
    var currdate = moment().format('YYYY-MM-DD');
    console.log(req.body);
    var entity = {
        IDCategory: req.body.IDCategory,
        DateProduct: currdate,
        Tittle: req.body.Tittle,
        Context: req.body.Context,
        SortContext: req.body.SortContext,
        AvatarBlog: req.body.linkAvatar
    }
    blogModel.add(entity)
    .then(id => {
        console.log(id);
        res.render('writer/add-blog', {
            title: "add-blog",
            layout: "../../views/_layouts/baseview-writer.hbs"
        });
    }).catch(err => {
        console.log(err);
    })
})

router.get("/edit/:id", (req, res) => {
    var id = req.params.id;
    var blog = blogModel.single(id);
    var categories = categoryModel.all();
    var p;
    Promise.all([blog, categories]).then(values => {
        if (values[0].length > 0) {
            for (const cat of values[1]) {
                if (cat.id == values[0].IDCategory) {
                    temp = cat;
                }
            }
            res.render('writer/edit-blog', {
                title: "edit-blog",
                layout: "../../views/_layouts/baseview-writer.hbs",
                blog: values[0],
                categories: values[1],
                error: false,
                temp: temp
            });
        } else {
            res.render('writer/edit-blog', {
                title: "edit-blog",
                layout: "../../views/_layouts/baseview-writer.hbs",
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
    });
})

router.post('/edit/:id', (req, res) => {
    var currdate = moment().format('YYYY-MM-DD');
    console.log(req.body);
    var entity = {
        IDCategory: req.body.IDCategory,
        DateProduct: currdate,
        Tittle: req.body.Tittle,
        Context: req.body.Context,
        SortContext: req.body.SortContext,
        AvatarBlog: req.body.linkAvatar
    }
    blogModel.update(entity)
    .then(id => {
        console.log(id);
        res.redirect('/writer/blog/publishing');
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;