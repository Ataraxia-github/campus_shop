import createError from 'http-errors'
import express from 'express';
import path from 'path';
const __dirname = path.resolve();
// 中间件用于获取web浏览器发送的cookie中的内容
import cookieParser from 'cookie-parser';
// 解析post请求中body携带的参数
import bodyParser from 'body-parser'; 
// 打印nodejs服务器接受到的请求的信息
import logger from 'morgan'
// 导入路由模块
import indexRouter from './routes/index.js'
// 导入session中间件
import session from 'express-session';

var app = express();

// 解决跨域问题
import cors from 'cors'
app.use(cors());

// 配置session中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 6
  }
}))

// 采用设置所有均可访问的方法解决跨域问题
app.all('*', function (req, res, next) {
  // 设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  // 跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() === 'options') {
    res.send(200); // 让options尝试请求快速结束
  } else {
    next();
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));

// 配置解析json格式数据的内置中间件
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());

// post传参
app.use(bodyParser.urlencoded({extended:true}))

// 静态资源，放在了public文件夹中
app.use(express.static(path.join(__dirname, 'public')));

// 注册路由组件
app.use(indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler异常处理
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(8000, () => {
  console.log('服务器已经启动，端口是：8000');
})

export default app;