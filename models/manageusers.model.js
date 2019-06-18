var db = require('../utils/db');

module.exports = {
    all: () => {
        return db.load('select * from users u  where u.Permission != 3 ORDER BY u.Permission ASC ');
    },
    
    update: (id,name) =>{
        return db.load(`UPDATE users SET Permission = ${name} WHERE IDuser = ${id}`);
    },

    insert:(name)=>{
        return db.load(`insert into Tags (NameTag)
        values("${name}")`)
    },
    delete: (id) =>{
        return db.load(`DELETE FROM users WHERE IDuser = ${id}`);
    },

    singleUser: (id)=>{
        return db.load(`SELECT u.* , a.EXP FROM users u LEFT JOIN  adddate a on u.Username = a.Username where u.IDuser = ${id}`)
    },

    user: (id)=>{
        return db.load(`SELECT u.* FROM users u where u.IDuser = ${id}`)
    }

};