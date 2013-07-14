var express = require('express')
  , routes = require('./routes')
  , post = require('./routes/post')
  , admin = require('./routes/admin')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({ secret:"secret"}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function restrict(req, res, next) {
	if (req.session.role && req.session.role == "admin") {
		next();
	} else {
    	req.session.error = 'Access denied!';
    	res.redirect('/admin/');
  	}
}



app.get('/', routes.index);
app.get('/admin/', admin.index);
app.post('/admin/login', admin.login);
app.get('/admin/logout', admin.logout);
app.get('/admin/dashboard', admin.dashboard);
app.get('/admin/getPost/:datetime', admin.getPost);
app.get('/posts/generate', post.generate);
app.get('/posts/regenerate', post.reGenerate);
app.get('/ajax/posts/loadnext/:created_at', post.loadNext);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
