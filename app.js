var express = require('express');
var app = express();
var mongoose = require('mongoose');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var admin = require('./routes/admin');

//连接数据库
var db = mongoose.connect('mongodb://localhost/mongoDemo');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/favicon.ico'));

app.use('/', routes);
app.use('/admin', admin);

// 配置404(中间件)
app.use(function (req,res,next) { 
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
 });

// 开发error页面
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

//配置500页面
app.use(function (err,req,res,next) { 
    res.status(err.status || 500);
    res.render('error',{
        message:errmessage,
        error:{}
    });
 });

 module.exports = app;