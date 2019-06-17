var db = require('../utils/percategory');

module.exports = {
    all: () => {
        return db.load('select Username, FirstName, Email from Users where Permission = 2');
    },

    choose: id => {
        return db.load(`select c.NameCategory from category c where not EXISTS(
        select *
        from permissioncategory p
        where c.IDCategory = p.IDCategory
        and p.Username = "${id}")`);
    },

    single: id =>{
        return db.load(`SELECT users.Username, NameParents, NameCategory, category.IDCategory FROM  users , permissioncategory, category, parentcategory
        WHERE users.Username = permissioncategory.Username
        AND permissioncategory.IDCategory= category.IDCategory 
        AND users.Username = "${id}" 
        AND parentcategory.IDParents= category.IDParents `);
    },

    singleEdit: id =>{
        return db.load(`SELECT users.Username, NameParent, NameCategory FROM  users , permissioncategory, category, parentcategory
        WHERE users.Username = permissioncategory.Username
        AND permissioncategory.IDCategory= category.IDCategory 
        AND users.Username = "${id}" 
        AND parentcategory.IDParents= category.IDParents `);
    },

    add:(id,name)=>{
        return db.add(id,name);
    },

    update:(id,namenew,name)=>{
        return db.update(id,namenew,name);
    },
    delete:(iduser,idcategory)=>{
        return db.delete(iduser,idcategory);
    }


    
};