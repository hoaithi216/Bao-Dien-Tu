var numeral = require('numeral');
var hbs_sections = require('express-handlebars-sections');
var exphbs = require('express-handlebars');


module.exports = function (app){


app.engine('hbs', exphbs({
    // defaultLayout: 'main.hbs',
    layoutsDir: 'views/_layouts',
    helpers: {
      format: val => {
        return numeral(val).format('0,0');
      },
      section: hbs_sections()
    }
  }));
}