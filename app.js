var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Arbeidskontoret');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Connected DB");
});

var projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    end_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    admins: [
    {
        admin_id: {
            type: String,
            required: true
        },
        date_added: {
            type: Date,default: Date.now,
            required: true
        },
        super_admin: {
            type: Boolean,
            default: false,
            required: true
        }
    }
    ],
    short_description: {
        type: String,
        default: "Short Description not set."
    },
    long_description: {
        type: String,
        default: "Long Description not set."
    },
    header_img: {
        type: String,
        default: ""
    }
})
var Project = mongoose.model('Project', projectSchema);

//var fluffy = new Kitten({ name: 'fluffy' });

/*fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  //fluffy.speak();
});*/


var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
/**
* Express middelware
**/
var cookieParser = require('cookie-parser');
var session = require('cookie-session');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
/**
* Add session support
**/
app.use(cookieParser('F@mTheGeeK'));
app.use(session({
  keys: ['key1', 'key2']
}))

app.use(express.static(path.join(__dirname, 'public')));

var appData = {
    title: 'Arbeidskontoret',
    projects: [],
    stillinger: [],
    brukere: []
};
app.get('/', function(req, res) {
  res.render('index', { title: 'Arbeidskontoret' });
});

app.get('/project_demo', function(req, res) {
  res.render('project', { title: 'Arbeidskontoret' });
});
/// catch 404 and forward to error handler
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
