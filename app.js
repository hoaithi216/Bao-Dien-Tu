var express = require('express');

var morgan = require('morgan');

var createError = require('http-errors');

var app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


require('./middlewares/view-engine')(app);
require('./middlewares/sesson')(app);
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
app.use('/admin', require('./routes/admin/category.route'));
app.use('/admin/users', require('./routes/admin/users.route'));


// created by Duy Thanh
// app.use('/writer/add-blog', require('./routes/writer/add-blog.route'));


////Thanh
app.use('/writer/blog', require('./routes/writer/blog.route'));
app.use('/editor', require('./routes/editor/manage-draft.route'));
////Thanh

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