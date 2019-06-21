var db = require('../utils/db');

module.exports = {
  all: () => {
    return db.load('select * from users');
  },

  single: id => {
    return db.load(`select * from users where IDuser = ${id}`);
  },

  singleByUserName: userName => {
    return db.load(`select * from users where Username = '${userName}'`);
  },

  add: entity => {
    return db.add('users', entity);
  },
  findInfoUser: (id) => {
    return db.load(`select * from users u where u.IDuser = ${id}`);
  },

  update: entity => {
    return db.update('users', 'IDuser', entity);
  },

  delete: id => {
    return db.delete('users', 'IDuser', id);
  },

  addate: (name,date) => {
    return db.load(`insert into adddate (Username,EXP) values("${name}", "${date}")`);
  },
};
