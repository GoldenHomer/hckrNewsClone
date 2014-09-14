var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    Comment = mongoose.model('Comment');

var routes = require('./routes/index'),
    users = require('./routes/users');

mongoose.connect('mongodb://localhost/news');
require('./models/Posts');
require('./models/Comments');
var app = express();

router.param('post', function(req, res, next, id){ // automatically load post object
    var query = Post.findById(id);
    query.exec(function(err, post){ //exec is used to pass the results to the Express callback
        if(err){return next(err);}
        if(!post){return 
            next(new Error("can't find post"));
        }
        req.post = post;
        return next();
    });
});

router.get('/posts', function(req, res, next){ // req contains all info made to server. res is the object that responds to client.
    Post.find(function(err, posts){
        if(err){
            return next(err);
        }
        res.json(posts);
    });
});

router.post('posts', function(req, res, next){
    var post = new Post(req.body);
    post.save(function(err, post){
        if(err){
            return next(err);
        }
        res.json(post);
    });
});

router.get('/posts/:post', function(req, res, next){
    req.post.populate('comments', function(err, post){ // populate automatically loads comments associated with that unique post
        res.json(post);
    });
});

router.put('posts/:post/upvote', function(req, res, next){
    req.post.upvote(function(err, post){
        if(err){return next(err);}
        res.json(post);
    });
});

router.post('/posts/:post/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

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