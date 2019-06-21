var express = require('express');
var moment = require('moment');
var temp2 = require('../../models/managedraft.model');
var editor = require('../../middlewares/editor');
var temp = require('../../models/manageblog.model');

var router = express.Router();

router.get('/', editor,(req, res) => {
    console.log(req.user.Username);
    temp2.catebyEditor(req.user.Username).then(rows => {
        var listcate = rows
        temp2.blogsByEditor(req.user.Username).then(rows => {
            console.log(rows);
            res.render('f_editor/vwDraft/listall', {
                layout: 'dashboard.hbs',
                listblogs: rows,
                listcate: listcate
            });
        }).catch(err => {
            console.log(err);
        });
    })

})

router.get('/view/:id', editor,(req, res) => {
    var id = req.params.id
    var Tags
    temp.findTags(id).then(rows => {
        Tags = rows;
        console.log(Tags)
        temp.singleBlog(id).then(rows => {
            var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
            var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
            res.render('f_editor/vwDraft/viewall', {
                layout: 'dashboard.hbs',
                Tags: Tags,
                blog: rows[0],
                status: rows[0].Status,
                dateproduct: dateproduct,
                datepublic: datepublic
            });
        })
    })


})


router.get('/edit/:id', editor,(req, res) => {
    var id = req.params.id
    var Tags
    var Categories

    temp.TagsnotBlog(id).then(rows => {
        var listtagnotblog = rows
        temp.findTags(id).then(rows => {
            Tags = rows;
            temp.findCate(id).then(rows => {
                Categories = rows;
                temp.singleBlog(id).then(rows => {
                    var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
                    var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
                    res.render('f_editor/vwDraft/edit', {
                        layout: 'dashboard.hbs',
                        Tags: Tags,
                        blog: rows[0],
                        status: rows[0].Status,
                        dateproduct: dateproduct,
                        datepublic: datepublic,
                        Categories: Categories,
                        typeblog: rows[0].TypeBlog,
                        listtagnotblog: listtagnotblog
                    });
                })
            })

        })
    })

})


router.post('/update/:id', editor,(req, res) => {
    var id = req.params.id;
    var nameCate = req.body.NameCategory
    var idCate
    var listtag = req.body.ListTag
    console.log(listtag);
    var i;
    temp.deleteTagbyBlog(id).then(id => {
    })
    for (i = 0; i < listtag.length; i++) {
        temp.insertTagsBlog(id, listtag[i]).then(id => {
        })
    }

    console.log(listtag);

    if (req.body.TypeBlog == '0') {
        var typeblog = 0;
    }
    else {
        var typeblog = 1;
    }

    temp.findIDCate(nameCate).then(rows => {
        idCate = rows[0].IDCategory;
        var pub = moment(req.body.DatePublic, 'DD/MM/YYYY').format('YYYY-MM-DD');
        var entity = {
            IDBlog: req.body.IDBlog,
            Tittle: req.body.Tittle,
            SortContext: req.body.SortContext,
            AvatarBlog: req.body.AvatarBlog,
            IDCategory: idCate,
            Status: 1,
            DatePublic: pub,
            Context: req.body.Context,
            TypeBlog: typeblog,
            Editor: req.user.IDuser,
            StatusEditor: 2
        }
        temp.update(entity)
            .then(id => {
                res.redirect(`/f_editor/draft`)
            }).catch(err => {
                console.log(err);
            })
    })
})


router.get('/refuse/:id', editor,(req, res) => {
    var id = req.params.id
    temp.singleBlog(id).then(rows => {
        res.render('f_editor/vwDraft/refuse', {
            layout: 'dashboard.hbs',
            blog: rows[0]
        });
    })

})

router.post('/refuse/:id', editor,(req, res) => {
    var id = req.params.id
    temp2.refuseEditor(id, req.body.Feedback).then(rows => {
        res.redirect(`/f_editor/draft`)
    })
})


router.get('/list_agree', editor,(req, res) => {
    console.log(req.user.Username);
    temp2.catebyEditor(req.user.Username).then(rows => {
        var listcate = rows
        console.log(req.user.IDuser)
        temp2.agreeblogsByEditor(req.user.IDuser, req.user.Username).then(rows => {
            console.log(rows);
            res.render('f_editor/vwDraft/list_agree', {
                layout: 'dashboard.hbs',
                listblogs: rows,
                listcate: listcate
            });
        }).catch(err => {
            console.log(err);
        });
    })

})


router.get('/list_agree/:id',editor, (req, res) => {
    var id = req.params.id
    var Tags
    temp.findTags(id).then(rows => {
        Tags = rows;
        console.log(Tags)
        temp.singleBlog(id).then(rows => {
            var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
            var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
            res.render('f_editor/vwDraft/view_list_agree', {
                layout: 'dashboard.hbs',
                Tags: Tags,
                blog: rows[0],
                status: rows[0].Status,
                dateproduct: dateproduct,
                datepublic: datepublic
            });
        })
    })
})


router.get('/list_refuse', editor,(req, res) => {
    console.log(req.user.Username);
    temp2.catebyEditor(req.user.Username).then(rows => {
        var listcate = rows
        console.log(req.user.IDuser)
        temp2.refuseblogsByEditor(req.user.IDuser, req.user.Username).then(rows => {
            console.log(rows);
            res.render('f_editor/vwDraft/list_refuse', {
                layout: 'dashboard.hbs',
                listblogs: rows,
                listcate: listcate
            });
        }).catch(err => {
            console.log(err);
        });
    })

})

router.get('/list_refuse/:id', editor,(req, res) => {
    var id = req.params.id
    var Tags
    temp.findTags(id).then(rows => {
        Tags = rows;
        console.log(Tags)
        temp.singleBlog(id).then(rows => {
            var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
            var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
            res.render('f_editor/vwDraft/view_list_refuse', {
                layout: 'dashboard.hbs',
                Tags: Tags,
                blog: rows[0],
                status: rows[0].Status,
                dateproduct: dateproduct,
                datepublic: datepublic
            });
        })
    })
})


module.exports = router;