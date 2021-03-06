var express = require('express');
var morgan = require('morgan');
var createError = require('http-errors');
var app = express();
var parentsCat = require('./models/parentscat.model');
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
app.use(require('./middlewares/locals2.mdw'));
app.use(require('./middlewares/locals.mdw'));
app.use(require('./middlewares/auth-locals.mdw'));

var authWriter = require('./middlewares/auth-writer');
var authEditor = require('./middlewares/auth-editor');


app.get('/', (req, res) => {
  
  res.redirect('/home');
})
//created by Hoai Thi
app.use('/account', require('./routes/account.route'));
app.use('/search', require('./routes/search.route'));
app.use('/tags', require('./routes/tags.route'));
app.use('/home', require('./routes/home.route'));
// app.use('/', require('./routes/showByCat.route'));
app.use('/google', require('./routes/loginGG.route'));
app.use('/category', require('./routes/category.route'));
//app.use('/admin', require('./routes/admin/category.route'));
//app.use('/admin/users', require('./routes/admin/users.route'));
//global.isActive = 0;

// created by Duy Thanh
// app.use('/writer/add-blog', require('./routes/writer/add-blog.route'));


////Thanh
app.use('/writer', authWriter, require('./routes/writer/blog.route'));
app.use('/editor', authEditor, require('./routes/editor/manage-draft.route'));
////Thanh


/// Duy Tan
app.get('/admin', (req, res) => {

  res.redirect('/admin/manageblogs/all')
})

app.get('/f_editor', (req, res) => {

  res.redirect('/f_editor/draft')
})

app.get('/f_writer', (req, res) => {

  res.redirect('/f_writer/blog')
})

app.get('/dashboard', (req, res) => {
    res.redirect('/account/profile')
 
})
app.use('/admin/percategory', require('./routes/f_admin/percategory.route'));
app.use('/admin/renewal', require('./routes/f_admin/accrenewal.route'));
app.use('/admin/managecategory', require('./routes/f_admin/managecategory.route'));
app.use('/admin/manageparents', require('./routes/f_admin/manageparents.route'));
app.use('/admin/managetag', require('./routes/f_admin/managetag.route'));
app.use('/admin/manageusers', require('./routes/f_admin/manageusers.route'));
app.use('/admin/manageblogs', require('./routes/f_admin/manageblog.route'));

app.use('/f_editor/draft', require('./routes/f_editor/managedraft.route'));
app.use('/f_writer', require('./routes/f_writer/f_writer.route'));



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