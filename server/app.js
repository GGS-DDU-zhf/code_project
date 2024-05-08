var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const UserRouter = require('./routes/admin/UserRouter');
const NewsRouter = require('./routes/admin/NewsRouter');
const WebNewsRouter = require('./routes/web/NewsRouter');
const ProductRouter = require('./routes/admin/ProductRouter')
const WebProductRouter = require('./routes/web/ProductRouter');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(WebNewsRouter)
app.use(WebProductRouter)

// 不需要进行token校验的路由注册在 ‘校验token是否合法有效’ 前面，需要的注册在后面

// 校验token是否合法有效
app.use((req, res, next) => {
  // 如果token有效，next()
  // 如果token过期，返回401错误
  if (req.url === '/adminapi/user/login') {
    next();
  } else {
    const token = req.headers['authorization'].split(' ')[1]

    if (token) {
      const payload = JWT.verify(token) // { iat: 1713419445, exp: 1713419455 }
      // payload {
      //   _id: '661f942f47610ec5335da55d',
      //   username: 'admin',
      //   iat: 1713419884,
      //   exp: 1713419894
      // }
      if (payload) {
        const { _id, username } = payload
        const newToken = JWT.generate({
          _id,
          username
        }, '1d') // 1d 一天

        res.header('Authorization', newToken)
        next()
      } else {
        res.status(401).send({ errCode: '-1', errorInfo: 'token过期' })
      }
    }
  }
})

/**
 * /adminapi/* - 后台系统用的
 * /webapi/* - 企业官网用的
*/
app.use(UserRouter)
app.use(NewsRouter)
app.use(ProductRouter)

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
