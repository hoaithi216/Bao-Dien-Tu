var express = require('express');
var morgan = require('morgan');
var createError = require('http-errors');
var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

////Thanh
var cookieParser = require('cookie-parser');
app.use(cookieParser());

var session = require('express-session');
app.use(session({
  cookie: { httpOnly: true },
  secret: 'keybroadcat',
  resave: false,
  saveUninitialized: false
}));
////Thanh

require('./middlewares/view-engine')(app);
// require('./middlewares/sesson')(app);
require('./middlewares/passport.js')(app);

app.set('view engine', 'hbs');

app.use(require('./middlewares/locals.mdw'));
app.use(require('./middlewares/auth-locals.mdw'));


app.get('/', (req, res) => {

  res.render('home');
})
//created by Hoai Thi
app.use('/account', require('./routes/account.route'));
app.use('/search', require('./routes/search.route'));
app.use('/loginfb', require('./routes/loginfb.route'));
// app.use('/', require('./routes/showByCat.route'));

app.use('/category', require('./routes/category.route'));
//app.use('/admin', require('./routes/admin/category.route'));
//app.use('/admin/users', require('./routes/admin/users.route'));


// created by Duy Thanh
// app.use('/writer/add-blog', require('./routes/writer/add-blog.route'));


////Thanh
app.use('/writer', require('./routes/f_writer/blog.route'));
app.use('/editor', require('./routes/editor/manage-draft.route'));
////Thanh


/// Duy Tan
app.use('/admin/percategory', require('./routes/f_admin/percategory.route'));
app.use('/admin/renewal', require('./routes/f_admin/accrenewal.route'));
app.use('/admin/managecategory', require('./routes/f_admin/managecategory.route'));
app.use('/admin/manageparents', require('./routes/f_admin/manageparents.route'));
app.use('/admin/managetag', require('./routes/f_admin/managetag.route'));
app.use('/admin/manageusers', require('./routes/f_admin/manageusers.route'));
app.use('/admin/manageblogs', require('./routes/f_admin/manageblog.route'));
//app.use('/f_writer/blog', require('./routes/f_writer/blog.route'));



app.use((req, res, next) => {
  next(createError(404));
})

app.use((err, req, res, next) => {
  var status = err.status || 500;
  var errorView = 'error';
  if (status === 404)
    errorView = '404';

  var msg = err.message;
  var error = err;
  res.status(status).render(errorView, {
    layout: false,
    msg,
    error
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Web Server is running at http://localhost:3000');
})