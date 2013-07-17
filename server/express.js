'use strict';

var express = require('express');
var app = express(),
    server = require('http').createServer(app),io = require('socket.io').listen(server),
    db = require('mongojs').connect('weekness'), 
    everyauth = require('everyauth');
app.use(express.bodyParser())
    .use(express.static(__dirname))
    .use(express.cookieParser())
    .use(express.session({ secret: 'idontknowwhatimdoing' }));
    //{ secret: 'thissecretrocks', cookie: { maxAge: 60000 } 


io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

try {
  // use livereload middleware
  app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);
} catch(ex) {
  //no such thing in production
}

exports = module.exports = server;

exports.use = function() {
//To allow use ObjectId or other any type of _id
var objectId = function (_id) {
    if (_id.length === 24 && parseInt(db.ObjectId(_id).getTimestamp().toISOString().slice(0,4), 10) >= 2010) {
        return db.ObjectId(_id);
    } 
    return _id;
};

//Function callback
var fn = function (req, res) {
    res.contentType('application/json');
    var fn = function (err, doc) { 
    //console.log('asdasdas',req.body ,err,doc)
        if (err) { 
            if (err.message) {
                doc = {error : err.message} 
            } else {
                doc = {error : JSON.stringify(err)} 
            }
        }
        if (typeof doc === "number" || req.params.cmd === "distinct") { doc = {ok : doc}; } 
        res.send(doc); 
    };
    return fn;
};

/* Routes */


// Query
app.get('/api/:collection', function(req, res) { 
    var item, sort = {}, qw = {};
    for (item in req.query) {
        req.query[item] = (typeof +req.query[item] === 'number' && isFinite(req.query[item])) 
            ? parseFloat(req.query[item],10) 
            : req.query[item];
        if (item != 'limit' && item != 'skip' && item != 'sort' && item != 'order' && req.query[item] != "undefined" && req.query[item]) {
            qw[item] = req.query[item]; 
        }
    }
    if (req.query.sort) { sort[req.query.sort] = (req.query.order === 'desc' || req.query.order === -1) ? -1 : 1; }
    db.collection(req.params.collection).find(qw).sort(sort).skip(req.query.skip).limit(req.query.limit).toArray(fn(req, res))
});

// Read 
app.get('/api/:collection/:id', function(req, res) {
    db.collection(req.params.collection).findOne({_id:objectId(req.params.id)}, fn(req, res))
});

// Save 
app.post('/api/:collection', function(req, res) {
	req.body = req.query;
    if (req.body._id) { req.body._id = objectId(req.body._id);}
    db.collection(req.params.collection).save(req.body, {safe:true}, fn(req, res));
});

// Delete
app.del('/api/:collection/:id', function(req, res) {
    db.collection(req.params.collection).remove({_id:objectId(req.params.id)}, {safe:true}, fn(req, res));
});

//Group
app.put('/api/:collection/group', function(req, res) {
    db.collection(req.params.collection).group(req.body, fn(req, res))
})

// MapReduce
app.put('/api/:collection/mapReduce', function(req, res) {
    if (!req.body.options) {req.body.options  = {}};
    req.body.options.out = { inline : 1};
    req.body.options.verbose = false;
    db.collection(req.params.collection).mapReduce(req.body.map, req.body.reduce, req.body.options, fn(req, res));    
})

// Command (count, distinct, find, aggregate)
app.put('/api/:collection/:cmd',  function (req, res) {
    if (req.params.cmd === 'distinct') {req.body = req.body.key}
    db.collection(req.params.collection)[req.params.cmd](req.body, fn(req, res)); 
})
  app.use.apply(app, arguments);
};

app.post('/upload', function (req, res) {
    console.log('Hello, transfer!');
    console.log(req);
    setTimeout(
        function () {
        res.setHeader('Content-Type', 'text/html');
            //res.setHeader('Content-Type', 'text/html');
            if (req.files.length == 0 || req.files.file.size == 0)
                res.send({ msg: 'No file uploaded at ' + new Date().toString() });
            else {
                var file = req.files.file;
                fs.unlink(file.path, function (err) {
                    if (err)
                        throw err;
                    else
                        res.send({ msg: '<b>"' + file.name + '"</b> uploaded to the server at ' + new Date().toString() });
                });
            }
        },
        (req.param('delay', 'yes') == 'yes') ? 2000 : -1
    );
});

exports.express = express;