var express = require('express');
var moment = require('moment');
var temp2 = require('../../models/f_writer.model');
var writer = require('../../middlewares/writer');
var temp = require('../../models/manageblog.model');
var router = express.Router();

router.get('/list_refuse', writer,(req, res) => {
    temp2.allblogbyrefuse(req.user.IDuser).then(rows => {
        console.log(rows);
        res.render('f_writer/vwRefuse/listall', {
            layout: 'dashboard.hbs',
            listblogs: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/list_refuse/:id', writer,(req, res) => {
    var id = req.params.id
    var Tags
    temp.findTags(id).then(rows => {
        Tags = rows;
        console.log(Tags)
        temp.singleBlog(id).then(rows => {
            var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
            var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
            res.render('f_writer/vwRefuse/viewall', {
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

router.get('/edit/:id', writer,(req, res) => {
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
                    res.render('f_writer/vwRefuse/edit', {
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

router.post('/update/:id', writer,(req, res) => {
    var id = req.params.id;
    var nameCate = req.body.NameCategory
    var idCate
    var listtag = req.body.ListTag
    console.log(listtag);
    var i;
    temp.deleteTagbyBlog(id).then(id => {
    })
    if (listtag != null) {
        for (i = 0; i < listtag.length; i++) {
            temp.insertTagsBlog(id, listtag[i]).then(id => {
            })
        }
    }
    temp2.findStatusEditor(id).then(rows => {
        var status = rows[0].StatusEditor

        temp.findIDCate(nameCate).then(rows => {
            idCate = rows[0].IDCategory;
            var entity = {
                IDBlog: req.body.IDBlog,
                Tittle: req.body.Tittle,
                SortContext: req.body.SortContext,
                AvatarBlog: req.body.AvatarBlog,
                IDCategory: idCate,
                Status: 0,
                Context: req.body.Context,
                StatusEditor: 0
            }
            temp.update(entity)
                .then(id => {
                    if (status == 0) {
                        res.redirect('/f_writer/list_draft')
                    } else {
                        res.redirect('/f_writer/list_refuse')
                    }
                }).catch(err => {
                    console.log(err);
                })
        })
    })


})

router.post('/delete/:id', writer,(req, res) => {
    var id = req.params.id;
    temp2.findStatusEditor(id).then(rows => {
        var status = rows[0].StatusEditor
        temp.delete(id).then(id => {
            if (status == 0) {
                res.redirect('/f_writer/list_draft')
            } else {
                res.redirect('/f_writer/list_refuse')
            }

        }).catch(err => {
            console.log(err);
        })
    })


})

/////agree 
router.get('/list_agree', writer,(req, res) => {
    temp2.allblogbyagree(req.user.IDuser).then(rows => {
        console.log(rows);
        res.render('f_writer/vwAgree/listall', {
            layout: 'dashboard.hbs',
            listblogs: rows
        });
    }).catch(err => {
        console.log(err);
    });
})


router.get('/list_agree/:id', writer,(req, res) => {
    var id = req.params.id
    var Tags
    temp.findTags(id).then(rows => {
        Tags = rows;
        console.log(Tags)
        temp.singleBlog(id).then(rows => {
            var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
            var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
            res.render('f_writer/vwAgree/viewall', {
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

//// draft
router.get('/list_draft', writer,(req, res) => {
    temp2.allblogbydraft(req.user.IDuser).then(rows => {
        console.log(rows);
        res.render('f_writer/vwDraft/listall', {
            layout: 'dashboard.hbs',
            listblogs: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/list_draft/:id', writer,(req, res) => {
    var id = req.params.id
    var Tags
    temp.findTags(id).then(rows => {
        Tags = rows;
        console.log(Tags)
        temp.singleBlog(id).then(rows => {
            var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
            var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
            res.render('f_writer/vwDraft/viewall', {
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

////blog

router.get('/blog', writer,(req, res) => {
    temp2.fullCate().then(rows =>{
        var Categories = rows
        temp2.fullTags().then(rows => {
            res.render('f_writer/vwBlog/edit', {
                layout: 'dashboard.hbs',
                Tags: rows,
                Categories:Categories
            });
        })
    })
})


router.post('/blog',writer, (req, res) => {
    
    var nameCate = req.body.NameCategory
    var idCate
    var listtag = req.body.ListTag
    var i;
    var date = new Date()
    date= moment(date).format('YYYY/MM/DD');
    temp.MaxIDBlog().then(rows =>{
        var maxID = rows[0].IDBlog
        maxID = maxID + 1
        temp.findIDCate(nameCate).then(rows => {
            idCate = rows[0].IDCategory;
            var entity = {
                Tittle: req.body.Tittle,
                SortContext: req.body.SortContext,
                AvatarBlog: req.body.AvatarBlog,
                IDCategory: idCate,
                Status: 0,
                Context: req.body.Context,
                StatusEditor: 0,
                DateProduct: date,
                Auth : req.user.IDuser
            }
            temp.add(entity)
                .then(id => {
                    if (listtag != null) {
                        for (i = 0; i < listtag.length; i++) {
                            temp.insertTagsBlog(maxID, listtag[i]).then(id => {

                            })
                        }
                        
                    }
                    res.redirect('/f_writer/blog')
                }).catch(err => {
                    console.log(err);
                })
        })

    })
})
module.exports = router;