var express = require('express');
var moment = require('moment');
var temp = require('../../models/manageblog.model');
var admin = require('../../middlewares/admin');

var router = express.Router();
router.get('/all', (req, res) => {
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

router.get('/view/:id', (req, res) => {
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

router.get('/edit/:id', (req, res) => {
    var id = req.params.id
    var Tags
    var Categories
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
                    Categories: Categories

                });
            })
        })

    })
})

router.post('/update/:id', (req, res) => {
    var id = req.params.id;
    var nameCate = req.body.NameCategory
    var idCate
    if (req.body.Status == 'Draft') {
        var status = 0;
    }
    else {
        var status = 1;
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
            Context: req.body.Context
        }
        temp.update(entity)
            .then(id => {
                res.redirect(`/admin/manageblogs/view/${req.body.IDBlog}`)
            }).catch(err => {
                console.log(err);
            })
    })
})

router.post('/delete/:id', (req, res) => {
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

router.get('/category', (req, res) => {
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

router.post('/category', (req, res) => {
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

router.get('/category/:id', (req, res) => {
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

router.get('/tag', (req, res) => {
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


router.post('/tag', (req, res) => {
    var name = req.body.NameTag

    if (name == "All") {
        res.redirect(`/admin/manageblogs/tag`)
    }
    temp.findIDTag(name).then(rows => {
        var id = rows[0].IDTag
        res.redirect(`/admin/manageblogs/tag/${id}`)
    })
})


router.get('/tag/:id', (req, res) => {
    var id = req.params.id
    temp.findNameTag(id).then(rows=>{
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