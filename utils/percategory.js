var mysql = require('mysql');

var createConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root',
        database: 'fit_news_data'
    });
}

module.exports = {
    load: sql => {
        return new Promise((resolve, reject) => {
            var connection = createConnection();
            connection.connect();
            connection.query(sql, function(error, results, fields) {
                if (error) {
                    reject(error);
                } else {
                    resolve(results);
                }
                connection.end();
            });
        });

    },

    add: (id,name)=>{
        return new Promise((resolve, reject) => {
            var sql= `insert into permissioncategory (Username, IDCategory)
            SELECT DISTINCT ?, c.IDCategory 
            FROM category c, permissioncategory p
            WHERE c.NameCategory=?
            `
            var connection = createConnection();
            connection.connect();
            connection.query(sql,[id,name], function(error, value) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.insertID);
                }
                connection.end();
            });
        });
    },


    update: (iduser,namenew,name)=>{
        return new Promise((resolve, reject) => {
            var sql= `update permissioncategory p, category c set p.IDCategory= c.IDCategory  where p.Username=?
            and c.NameCategory=?
            and exists (SELECT * from category c2 where c2.NameCategory=? and  p.IDCategory= c2.IDCategory) `
            var connection = createConnection();
            connection.connect();
            connection.query(sql,[iduser,namenew,name], function(error, value) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.insertID);
                }
                connection.end();
            });
        });
    },

    delete: (iduser,idcategory)=>{
        return new Promise((resolve, reject) => {
            var sql= `DELETE p.* FROM permissioncategory p, category c WHERE p.Username = ? and c.NameCategory= ? and c.IDCategory=p.IDCategory`
            var connection = createConnection();
            connection.connect();
            connection.query(sql,[iduser,idcategory], function(error, value) {
                if (error) {
                    reject(error);
                } else {
                    resolve(value.insertID);
                }
                connection.end();
            });
        });
    }
};