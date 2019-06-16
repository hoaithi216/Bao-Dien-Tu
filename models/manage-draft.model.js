var db = require('../utils/db');

module.exports = {

  getBlogsWithDetails: (UserID, StatusEditor) => {
    return db.load(`select c.IDCategory, c.NameCategory, b.IDBlog, b.Tittle, b.DateProduct, b.DatePublic, b.SortContext, b.Context, b.AvatarBlog, wrt.NickName
      from ((users edt inner join category c on edt.IDUser = ${UserID} and edt.Permission = c.IDCategory)
      inner join blogs b on b.IDCategory = c.IDCategory and b.StatusEditor = ${StatusEditor})
      inner join users wrt on wrt.IDuser = b.Auth`);
  }
  
};