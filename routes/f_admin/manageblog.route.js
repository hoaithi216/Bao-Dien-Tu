var express = require('express');
var moment = require('moment');
var temp = require('../../models/manageblog.model');
var admin = require('../../middlewares/admin');

var router = express.Router();

router.get('/', admin, (req, res) => {
    res.redirect('admin.manageblogs/all', {
        layout: 'dashboard.hbs',
        listblogs: rows
    });
})
router.get('/all', admin, (req, res) => {
    temp.all().then(rows => {
        console.log(rows);
        res.render('f_admin/vwBlog/listall', {
            layout: 'dashboard.hbs',
            listblogs: rows
        });
    }).catch(err => {
        console.log(err);
    });
})

router.get('/view/:id', admin, (req, res) => {
    var id = req.params.id
    var Tags
    temp.findTags(id).then(rows => {
        Tags = rows;
        console.log(Tags)
        temp.singleBlog(id).then(rows => {
            var dateproduct = moment(rows[0].DateProduct).format('DD/MM/YYYY');
            var datepublic = moment(rows[0].DatePublic).format('DD/MM/YYYY');
            res.render('f_admin/vwBlog/viewall', {
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

router.get('/edit/:id', admin, (req, res) => {
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
                    res.render('f_admin/vwBlog/edit', {
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

router.post('/update/:id', admin, (req, res) => {
    var id = req.params.id;
    var nameCate = req.body.NameCategory
    var idCate
    var listtag = req.body.ListTag
    console.log(listtag);
    var i;
    temp.deleteTagbyBlog(id).then(id=>{    
    })
    for (i = 0; i < listtag.length; i++) {
        temp.insertTagsBlog(id,listtag[i]).then(id=>{
        })
    }

    console.log(listtag);
    if (req.body.Status == 'Draft') {
        var status = 0;
    }
    else {
        var status = 1;
    }

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
            Status: status,
            DatePublic: pub,
            Context: req.body.Context,
            TypeBlog: typeblog,
            StatusEditor: 2
        }
        temp.update(entity)
            .then(id => {
                res.redirect(`/admin/manageblogs/view/${req.body.IDBlog}`)
            }).catch(err => {
                console.log(err);
            })
    })
})

router.post('/delete/:id', admin, (req, res) => {
    var id = req.params.id;
    temp.delete(id)
        .then(id => {
            res.redirect('/admin/manageblogs')
        }).catch(err => {
            console.log(err);
        })
})


function findTag(listtag, id) {
    temp.findTags(id).then(rows => {
        listtag = rows
    })
    return listtag;
}

////////////////////////////////// Quản lí theo Category
////////////////////////

router.get('/category', admin, (req, res) => {
    temp.allCategory().then(rows => {
        var listcategory = rows
        temp.all().then(rows => {
            console.log(rows);
            res.render('f_admin/vwBlogCategory/listall', {
                layout: 'dashboard.hbs',
                listblogs: rows,
                listcategory: listcategory
            });
        }).catch(err => {
            console.log(err);
        });
    })
})

router.post('/category', admin, (req, res) => {
    var name = req.body.NameCategory

    if (name == "All") {
        res.redirect(`/admin/manageblogs/category`)
    }
    temp.findIDCate(name).then(rows => {
        var idCate = rows[0].IDCategory
        console.log(idCate + "fajffffffffffffffffffffffffffffffffk")
        res.redirect(`/admin/manageblogs/category/${idCate}`)
    })
})

router.get('/category/:id', admin, (req, res) => {
    var id = req.params.id
    temp.findCate2(id).then(rows => {
        var listcategory = rows
        temp.blogsByCategory(id).then(rows => {
            console.log(rows);
            if (rows.length > 0) {
                res.render('f_admin/vwBlogCategory/singleall', {
                    layout: 'dashboard.hbs',
                    listblogs: rows,
                    listcategory: listcategory,
                    nameCate: rows[0].NameCategory
                });
            }
            else {
                res.render('f_admin/vwBlogCategory/singleall', {
                    layout: 'dashboard.hbs',
                    error: true
                });
            }

        }).catch(err => {
            console.log(err);
        });

    })
})

///Quan li theo tag

router.get('/tag', admin, (req, res) => {
    temp.allTag().then(rows => {
        var listtags = rows
        temp.all().then(rows => {
            console.log(rows);
            res.render('f_admin/vwBlogTag/listall', {
                layout: 'dashboard.hbs',
                listblogs: rows,
                listtags: listtags
            });
        }).catch(err => {
            console.log(err);
        });
    })
})


router.post('/tag', admin, (req, res) => {
    var name = req.body.NameTag

    if (name == "All") {
        res.redirect(`/admin/manageblogs/tag`)
    }
    temp.findIDTag(name).then(rows => {
        var id = rows[0].IDTag
        res.redirect(`/admin/manageblogs/tag/${id}`)
    })
})


router.get('/tag/:id', admin, (req, res) => {
    var id = req.params.id
    temp.findNameTag(id).then(rows => {
        var nameTag = rows[0].NameTag
        temp.findTag(id).then(rows => {
            var listtags = rows
            temp.blogsByTag(id).then(rows => {
                console.log(rows);
                if (rows.length > 0) {
                    res.render('f_admin/vwBlogTag/singleall', {
                        layout: 'dashboard.hbs',
                        listblogs: rows,
                        listtags: listtags,
                        nameTag: nameTag
                    });
                }
                else {
                    res.render('f_admin/vwBlogTag/singleall', {
                        layout: 'dashboard.hbs',
                        error: true
                    });
                }

            }).catch(err => {
                console.log(err);
            });

        })
    })
})


module.exports = router;