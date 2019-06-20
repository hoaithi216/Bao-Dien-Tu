var db = require('../utils/db');

module.exports = {
    blogsByEditor: (editor) => {
        return db.load(`SELECT b.*, u.Username, c.NameCategory, p.Username FROM blogs b LEFT JOIN users u on b.Auth = u.IDuser  LEFT JOIN permissioncategory p on b.IDCategory = p.IDCategory LEFT JOIN category c ON b.IDCategory = c.IDCategory WHERE p.Username = '${editor}' and b.StatusEditor = 1
        `);
    },
};