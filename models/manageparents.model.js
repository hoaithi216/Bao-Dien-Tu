var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from parentcategory p  ORDER BY p.IDParents ASC ');
    },
    choose: () =>{
        return db.load(`Select * from parentcategory`);
    },
    update: (id,name) =>{
        return db.load(`UPDATE parentcategory SET NameParents = "${name}" WHERE IDParents = ${id}`);
    },

    insert:(nameparents)=>{
        return db.load(`insert into parentcategory (NameParents)
        values("${nameparents}")`)
    },
    delete: (id) =>{
        return db.load(`DELETE FROM category WHERE IDCategory = ${id}`);
    },

};