
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , session= require('express-session');
  
var signIn = require('./routes/signIn')
  , signUp = require('./routes/signUp')
  , index = require('./routes/index')
  , category = require('./routes/category')
  , product = require('./routes/product')
  , user = require('./routes/user')
  , activate = require('./routes/activate')
  , cart = require('./routes/shoppingcart')
  , buy = require('./routes/buy')
  , sell = require('./routes/sell')
  , trans = require('./routes/trans');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.cookieParser());
app.use(session({
	  secret: 'ebay',
	  cookie: {maxAge: 86400000},
	  saveUninitialized: true,
	  resave: true
	}));
app.use(app.router);


// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.homepage);
app.get('/signUp', signUp.signUp);
app.post('/afterSignUp', signUp.afterSignUp);
app.get('/signIn', signIn.signIn);
app.get('/afterSignIn', signIn.afterSignIn);
app.get('/Category/:id',category.showCategory);
app.get('/Product/:id',product.showProduct);
app.get('/myaccount', user.showUser);
app.get('/bactivate', activate.bactivate);
app.get('/sactivate', activate.sactivate);
app.get('/bdeactivate', activate.bdeactivate);
app.get('/sdeactivate', activate.sdeactivate);
app.get('/signOut',index.signout);
app.get('/cart',cart.show);
app.post('/Product/:id',buy.buy);
app.get('/sell', sell.sell);
app.post('/sell', sell.afterSell);
app.get('/transactions/:id', trans.show);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
