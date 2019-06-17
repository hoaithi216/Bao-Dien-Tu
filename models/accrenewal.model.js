var db = require('../utils/accrenewal');

module.exports = {
    all: () => {
        return db.load('select u.Username, u.FirstName, u.Email, a.EXP from users u, adddate a where u.Username = a.Username and u.Permission = 0');
    },

    view: id =>{
        return db.load(`select u.Username, a.EXP from users u, adddate a where u.Username = a.Username and u.Permission =  0 and u.Username = "${id}"`);
    },
    update:(exp,iduser)=>{
        return db.update(exp,iduser);
    }
};