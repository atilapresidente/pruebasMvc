var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override');//hoja 29 ejercicio 2


//var indexRouter = require('./routes/index');//hoja28 recetas
//var usersRouter = require('./routes/users');//hoja28 recetas
var controlador = require('./routes/controlador');//hoja28 recetas

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');//hoja28 recetas

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



//hoja 29, ejercicio 1
/*app.use(methodOverride((req, res)=>{
	if(req.body && typeof req.body === 'object' && 'metodo' in req.body) {
		var method = req.body.metodo;
		delete req.body.metodo;
		return method;
	}
}));*/
//hoja 29, ejercicio 1
app.use(methodOverride(function (req, res){
	var method = req.body.metodo;
		delete req.body.metodo;
		return method;
	}));




//app.use('/', indexRouter);//hoja28 recetas
//app.use('/users', usersRouter);//hoja28 recetas
app.use('/', controlador);//hoja28 recetas

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
