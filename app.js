var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var partials = require('express-partials');
var engine = require('ejs-locals');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.engine('ejs',engine);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(partials());
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

//routes 
app.get('/index',function(req,res){
  res.render('index',{
    title:'设计师平台',
    layout:'layout'
  });
});

app.get('/userCenter/info',function(req,res){
    res.render('userCenter/info',{
      title:'设计师平台-个人信息',
      layout:'user-layout'
    });
});
app.get('/userCenter/security-via',function(req,res){
    res.render('userCenter/security-via',{
      title:'设计师平台-安全认证',
      layout:'user-layout'
    });
});

app.get('/userCenter/asset-manage',function(req,res){
    res.render('userCenter/asset-manage',{
      title:'设计师平台-资产管理',
      layout:'user-layout'
    });
});
app.get('/userCenter/member-manage',function(req,res){
    res.render('userCenter/member-manage',{
      title:'设计师平台-会员管理',
      layout:'user-layout'
    });
});
app.get('/userCenter/notice',function(req,res){
    res.render('userCenter/notice',{
      title:'设计师平台-通知中心',
      layout:'layout'
    });
});
app.get('/myfiles/index',function(req,res){
    res.render('myfiles/index',{
      title:'设计师平台-我的项目',
      layout:'layout'
    });
});



app.get('/login',function(req,res){

    res.render('login',{
      title:'登录',
      layout:false
    });
    
   
});
app.get('/register',function(req,res){
    res.render('register',{
      title:'注册',
      layout:false
    });
    
   
});

app.get('/password',function(req,res){
    res.render('password',{
      title:'修改密码',
      layout:false
    });
    
   
});
app.get('/logout',function(req,res){
    res.render('index',{
      title:'登出'
    });
});

app.get('/myfiles/index/:id',function(req,res){
     var id = req.params.id;
     
     console.log("参数中的id:"+id);
     // if(id) {
     //  project = {
     //    href:'/myfiles/index/id',
     //    name:'通江路丰城国际大厦设计项目'
     //  }
     // }
     res.render('myfiles/detail', {
        title:'通江路丰城国际大厦设计项目',
        layout:'layout'
        // href:project['href'],
        // name:project['name']
      });
});
app.get('/project/index',function(req,res){
    res.render('project/index',{
      title:'设计师平台-项目',
      layout:'layout'
    });
});
app.get('/calendar/index',function(req,res){
    res.render('calendar/index',{
      title:'设计师平台-日历',
      layout:'layout'
    });
});
app.get('/knowledge/index',function(req,res){
    res.render('knowledge/index',{
      title:'设计师平台-知识',
      layout:'layout'
    });
});
app.get('/gallery/index',function(req,res){
    res.render('gallery/index',{
      title:'设计师平台-图库',
      layout:'layout'
    });
});
app.get('/personalCenter/index',function(req,res){
    res.render('personalCenter/index',{
      title:'个人中心-首页',
      layout:'personal-layout'
    });
});
app.get('/personalCenter/task',function(req,res){
    res.render('personalCenter/task',{
      title:'个人中心-任务',
      layout:'personal-layout'
    });
});
app.get('/personalCenter/files',function(req,res){
    res.render('personalCenter/files',{
      title:'个人中心-文件',
      layout:'personal-layout'
    });
});
app.get('/personalCenter/discuss',function(req,res){
    res.render('personalCenter/discuss',{
      title:'个人中心-讨论',
      layout:'personal-layout'
    });
});
app.get('/personalCenter/calendar',function(req,res){
    res.render('personalCenter/calendar',{
      title:'个人中心-日历',
      layout:'personal-layout'
    });
});
app.get('/personalCenter/knowledge',function(req,res){
    res.render('personalCenter/knowledge',{
      title:'个人中心-知识',
      layout:'personal-layout'
    });
});
app.get('/personalCenter/gallery',function(req,res){
    res.render('personalCenter/gallery',{
      title:'个人中心-图库',
      layout:'personal-layout'
    });
});

app.get('/error',function(req,res){
  res.render('error',{
    title:'测试test',
    layout:'layout'
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
