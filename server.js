var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controllers.js');

app.use('/', routes);
app.use('/update', routes);
app.use('/create', routes);

app.listen(PORT);

console.log(module.exports)
