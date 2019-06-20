var db = require('../utils/db');

module.exports = {

  getBlogsWithDetails: (UserID, StatusEditor) => {
    return db.load(`select c.IDCategory, c.NameCategory, b.IDBlog, b.Tittle, b.DateProduct, b.DatePublic, b.SortContext, b.Context, b.AvatarBlog, wrt.NickName
      from (((users edt inner join permissioncategory p on edt.IDUser = ${UserID} and edt.Username = p.Username)
      inner join blogs b on b.IDCategory = p.IDCategory and b.StatusEditor = ${StatusEditor})
			join category c on b.IDCategory = c.IDCategory)
      inner join users wrt on wrt.IDuser = b.Auth`);
  }
  
};