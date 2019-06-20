var express = require('express');
var moment = require('moment');
var blogModel = require('../../models/blog.model');
var categoryModel = require('../../models/category.model');
var manageModel = require('../../models/manage-draft.model');

var router = express.Router();

router.get("/", (req, res) => {
    res.redirect('/editor/pending');
})

router.get("/pending", (req, res) => {
    var iduser = req.session.user.IDuser;
    var statuseditor = 4;
    manageModel.getBlogsWithDetails(iduser, statuseditor)
    .then(rows => {
        res.render('editor/pending-draft', {
            title: "manage-draft",
            layout: "baseview-editor.hbs",
            drafts: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/accepted", (req, res) => {
    var iduser = req.session.user.IDuser;
    var statuseditor = 1;
    manageModel.getBlogsWithDetails(iduser, statuseditor)
    .then(rows => {
        console.log(rows);
        res.render('editor/accepted-blog', {
            title: "manage-draft",
            layout: "baseview-editor.hbs",
            drafts: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/refused", (req, res) => {
    var iduser = req.session.user.IDuser;
    var statuseditor = 3;
    manageModel.getBlogsWithDetails(iduser, statuseditor)
    .then(rows => {
        console.log(rows);
        res.render('editor/refused-blog', {
            title: "manage-draft",
            layout: "baseview-editor.hbs",
            drafts: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/accept/:id", (req, res) => {
    var id = req.params.id;
    Promise.all([blogModel.single(id),
                categoryModel.all()])
    .then(([blog, cat]) => {
        let temp;
        if (blog.length > 0) {
            for (const c of cat) {
                if (c.id == blog.IDCategory) {
                    temp = c;
                }
            }
            res.render('editor/accept-blog', {
                title: "accept-blog",
                layout: "baseview-editor.hbs",
                blog: blog,
                categories: cat,
                error: false,
                temp: temp
            });
        } else {
            res.render('editor/accept-blog', {
                title: "accept-blog",
                layout: "baseview-editor.hbs",
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
    });
})

router.post('/accept/:id', (req, res) => {
    var DatePublic = moment(req.body.DatePublic, 'DD/MM/YYYY hh:mm:ss').format('YYYY-MM-DD hh:mm:ss');
    var premium = 0;
    var iduser = req.session.user.IDuser;
    if (req.body.Premium == 1) premium = 1;
    console.log(req.body);
    var entity = {
        IDBlog: req.params.id,
        IDCategory: req.body.IDCategory,
        Tittle: req.body.Tittle,
        DatePublic: DatePublic,
        Context: req.body.Context,
        SortContext: req.body.SortContext,
        AvatarBlog: req.body.linkAvatar,
        StatusEditor: 1,
        TypeBlog: premium,
        Editor: iduser
    }
    blogModel.update(entity)
    .then(id => {
        console.log(id);
        res.redirect('/editor/accepted');
    }).catch(err => {
        console.log(err);
    })
})

router.get("/refuse/:id", (req, res) => {
    var id = req.params.id;
    Promise.all([blogModel.single(id),
                categoryModel.all()])
    .then(([blog, cat]) => {
        let temp;
        if (blog.length > 0) {
            for (const c of cat) {
                if (c.id == blog.IDCategory) {
                    temp = c;
                }
            }
            res.render('editor/refuse-blog', {
                title: "refuse-blog",
                layout: "baseview-editor.hbs",
                blog: blog,
                categories: cat,
                error: false,
                temp: temp
            });
        } else {
            res.render('editor/refuse-blog', {
                title: "refuse-blog",
                layout: "baseview-editor.hbs",
                error: true
            });
        }
    }).catch(err => {
        console.log(err);
    });
})

router.post('/refuse/:id', (req, res) => {
    var iduser = req.session.user.IDuser;
    var entity = {
        IDBlog: req.params.id,
        IDCategory: req.body.IDCategory,
        Tittle: req.body.Tittle,
        Context: req.body.Context,
        SortContext: req.body.SortContext,
        AvatarBlog: req.body.linkAvatar,
        StatusEditor: 3,
        Feedback: req.body.Feedback,
        Editor: iduser
    }
    console.log(entity);
    blogModel.update(entity)
    .then(id => {
        console.log(id);
        res.redirect('/editor/refused');
    }).catch(err => {
        console.log(err);
    })
})

module.exports = router;