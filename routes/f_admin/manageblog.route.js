var express = require('express');
var moment = require('moment');
var temp = require('../../models/manageblog.model');
var admin = require('../../middlewares/admin');

var router = express.Router();
router.get('/', (req, res) => {



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
    if (req.body.Status == 'Draft'){
        var status = 0;
    }
    else{
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


function findTag(listtag, id) {
    temp.findTags(id).then(rows => {
        listtag = rows
    })
    return listtag;
}

module.exports = router;