var express = require('express');
var productModel = require('../models/blog.model');

var router = express.Router();

router.get('/:subNameCat', (req, res, next) => {
  res.end('thi');
})
//   var limit = 6;
//   var catId = req.params.id;

//   var page = req.query.page || 1;
//   if (page < 1) page = 1;
//   var offset = (page - 1) * limit;

//   Promise.all([
//     productModel.countByCat(catId),
//     productModel.pageByCat(catId, limit, offset)
//   ]).then(([count_rows, rows]) => {

//     for (const c of res.locals.lcCategories) {
//       if (c.CatID === +catId) {
//         c.isActive = true;
//       }
//     }

//     var pages = [];
//     var total = count_rows[0].total;
//     var nPages = Math.floor(total / limit);
//     if (total % limit > 0) nPages++;
//     for (i = 1; i <= nPages; i++) {
//       var active = false;
//       if (+page === i) active = true;

//       var obj = {
//         value: i,
//         active
//       }
//       pages.push(obj);
//     }

//     res.render('vwProducts/byCat', {
//       products: rows,
//       pages
//     });
//   }).catch(next);
// })

module.exports = router;