var express = require('express');
var moment = require('moment');
var blogModel = require('../../models/blog.model');
var categoryModel = require('../../models/category.model');
var auth = require('../../middlewares/auth');

var router = express.Router();

router.get("/", (req, res, next) => {
    res.redirect('/writer/publishing');
})

router.get("/publishing", (req, res, next) => {
    var iduser = req.session.user.IDuser;
    var statuseditor = 1;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        console.log(rows);
        res.render('writer/publishing-blog', {
            title: "view-blog-list",
            layout: "dashboard.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/published", (req, res, next) => {
    var iduser = req.session.user.IDuser;
    var statuseditor = 2;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        res.render('writer/published-blog', {
            title: "view-blog-list",
            layout: "dashboard.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/refused", (req, res, next) => {
    var iduser = req.session.user.IDuser;
    var statuseditor = 3;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        res.render('writer/refused-blog', {
            title: "view-blog-list",
            layout: "bdashboard.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/pending", (req, res, next) => {
    var iduser = req.session.user.IDuser;
    var statuseditor = 4;
    blogModel.getBlogs(iduser, statuseditor)
    .then(rows => {
        res.render('writer/pending-blog', {
            title: "view-blog-list",
            layout: "dashboard.hbs",
            blogs: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/add", (req, res, next) => {
    console.log(req.user);
    var p = categoryModel.all();
    p.then(rows => {
        res.render('writer/add-blog', {
            title: "add-blog",
            layout: "dashboard.hbs",
            categories: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.post('/add', (req, res, next) => {
    var currdate = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log(req.body);
    var entity = {
        IDCategory: req.body.IDCategory,
        DateProduct: currdate,
        Tittle: req.body.Tittle,
        Context: req.body.Context,
        SortContext: req.body.SortContext,
        Auth: req.session.user.IDuser,
        AvatarBlog: req.body.linkAvatar,
        amount_of_views: 0,
        StatusEditor: 4,
        TypeBlog: 0
    }
    blogModel.add(entity)
    .then(id => {
        console.log(id);
        res.render('writer/add-blog', {
            title: "add-blog",
            layout: "dashboard.hbs"
        });
    }).catch(err => {
        console.log(err);
    })
})

router.get("/edit/:id", (req, res, next) => {
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
                layout: "dashboard.hbs",
                blog: values[0],
                categories: values[1],
                error: false,
                temp: temp
            });
        } else {
            res.render('writer/edit-blog', {
                title: "edit-blog",
                layout: "dashboard.hbs",
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
    });
})

router.post('/edit/:id', (req, res, next) => {
    var currdate = moment().format('YYYY-MM-DD hh:mm:ss');
    console.log(req.body);
    var entity = {
        IDBlog: req.params.id,
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
        res.redirect('/writer/publishing');
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;