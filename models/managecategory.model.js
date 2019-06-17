var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from parentcategory p , category c where p.IDParents = c.IDParents ORDER BY p.NameParents ');
    },
    choose: () =>{
        return db.load(`Select * from parentcategory`);
    },
    add: (id,name) =>{
        return db.load(`UPDATE category SET NameCategory = "${name}" WHERE IDCategory= ${id}`);
    },

    insert:(namecate,nameparents)=>{
        return db.load(`insert into category (NameCategory, IDParents)
        SELECT DISTINCT "${namecate}", p.IDParents	
        FROM category c, parentcategory p
        WHERE p.NameParents = "${nameparents}"`)
    },
    delete: (id) =>{
        return db.load(`DELETE FROM category WHERE IDCategory = ${id}`);
    },
    update:(exp,iduser)=>{
        return db.update(exp,iduser);
    }
};