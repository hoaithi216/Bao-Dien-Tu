var db = require('../utils/db');

module.exports = {
    blogsByEditor: (editor) => {
        return db.load(`SELECT b.*, u.Username , c.NameCategory FROM blogs b LEFT JOIN users u on b.Auth = u.IDuser  LEFT JOIN permissioncategory p on b.IDCategory = p.IDCategory LEFT JOIN category c ON b.IDCategory = c.IDCategory WHERE p.Username = '${editor}' and b.StatusEditor = 0
        `);
    },
    catebyEditor: (editor) => {
        return db.load(`SELECT c.* FROM  permissioncategory p LEFT JOIN category c on c.IDCategory = p.IDCategory WHERE p.Username = "${editor}"`);
    },
    refuseEditor: (id,context) => {
        return db.load(`UPDATE blogs b SET b.StatusEditor = 1, b.Status = 0 , b.Feedback = "${context}" WHERE b.IDBlog = ${id}`);
    },

    agreeblogsByEditor: (ideditor,nameeditor) => {
        return db.load(`SELECT b.*, u.Username , c.NameCategory FROM blogs b LEFT JOIN users u on b.Auth = u.IDuser  LEFT JOIN permissioncategory p on b.IDCategory = p.IDCategory LEFT JOIN category c ON b.IDCategory = c.IDCategory WHERE p.Username = '${nameeditor}' and b.StatusEditor = 2 and b.Editor = ${ideditor} `);
    },

    refuseblogsByEditor: (ideditor,nameeditor) => {
        return db.load(`SELECT b.*, u.Username , c.NameCategory FROM blogs b LEFT JOIN users u on b.Auth = u.IDuser  LEFT JOIN permissioncategory p on b.IDCategory = p.IDCategory LEFT JOIN category c ON b.IDCategory = c.IDCategory WHERE p.Username = '${nameeditor}' and b.StatusEditor = 1 and b.Editor = ${ideditor} `);
    },


};