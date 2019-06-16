var express = require('express');
var moment = require('moment');
var manageModel = require('../../models/manage-draft.model');

var router = express.Router();

router.get("/", (req, res) => {
    res.redirect('/editor/pending');
})

router.get("/pending", (req, res) => {
    var iduser = 5;
    var statuseditor = 4;
    manageModel.getBlogsWithDetails(iduser, statuseditor)
    .then(rows => {
        res.render('editor/pending-draft', {
            title: "manage-draft",
            layout: "../../views/_layouts/baseview-editor.hbs",
            drafts: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/accepted", (req, res) => {
    var iduser = 5;
    var statuseditor = 1;
    manageModel.getBlogsWithDetails(iduser, statuseditor)
    .then(rows => {
        console.log(rows);
        res.render('editor/accepted-blog', {
            title: "manage-draft",
            layout: "../../views/_layouts/baseview-editor.hbs",
            drafts: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

router.get("/refused", (req, res) => {
    var iduser = 5;
    var statuseditor = 3;
    manageModel.getBlogsWithDetails(iduser, statuseditor)
    .then(rows => {
        res.render('editor/refused-blog', {
            title: "manage-draft",
            layout: "../../views/_layouts/baseview-editor.hbs",
            drafts: rows
        })
    }).catch(err => {
        console.log(err);
    });
})

module.exports = router;