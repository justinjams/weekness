'use strict';

var express = require('express');
var app = express(),
    //io = require('socket.io').listen(server),
    db = require('mongojs').connect('weekness'), 
    nconf = require('nconf'),
    everyauth = require('everyauth'),
    jade = require('jade'),
    q = require('q'),
    bcrypt = require('bcrypt'),
    _ = require('underscore'),
    cronJob = require('cron').CronJob,
    mongoose = require('mongoose');

    db.collection('weeknesses').find({}, function(err, stuff){console.log(stuff)});

mongoose.connect('localhost/weekness');
var mongooseDb = mongoose.connection;
var Schema = mongoose.Schema;

mongooseDb.on('error', console.error.bind(console, 'connection error:'));
mongooseDb.once('open', function callback () {
    var userSchema = new Schema({
        username: String,
        name: String,
        email: String,
        city: String,
        state: String,
        country: String,
        gender: String,
        bio: String,
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        lastLogin: { type: Date, default: Date.now },
    });
    var weeknessSchema = new Schema({
        name: String,
        title: String,
        description: String,
        categoryId: String,
        artifactType: String,
        generation: { type: Number, default: 0 },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        creator: String
    });
    var todoSchema = new Schema({
        title: String,
        slug: String,
        body: String,
        votes: { type: Number, default: 0 },
        weekness: [weeknessSchema],
        artifactType: String,
        artifact: String,
        generation: Number,
        duration: Number,
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        creator: String
    });
    var didSchema = new Schema({
        title: String,
        body: String,
        weekness: [weeknessSchema],
        todo: [todoSchema],
        artifact: {
            content: String,
            type: {type: String},
        },
        created: { type: Date, default: Date.now },
        updated: { type: Date, default: Date.now },
        creator: String,
        meta: {
            cools: Number,
            favs: Number
        }
    });

    var User = mongoose.model('User', userSchema),
        Weekness = mongoose.model('Weekness', weeknessSchema),
        Todo = mongoose.model('Todo', todoSchema),
        Did = mongoose.model('Did', didSchema);

    User.find(function (err, users) {
        if (err) {
            error.log(err);
            return;
        }
    })
});

console.log('Nessie awakens!');
/*
  var UserSchema = new Schema({})
      , User;

    // STEP 1: Schema Decoration and Configuration for the Routing
    UserSchema.plugin(mongooseAuth, {
        // Here, we attach your User model to every module
        everymodule: {
          everyauth: {
              User: function () {
                return User;
              }
          }
        }

      , facebook: {
          everyauth: {
              myHostname: 'http://localhost:25750'
            , appId: 'YOUR APP ID HERE'
            , appSecret: 'YOUR APP SECRET HERE'
            , redirectPath: '/'
          }
        }
    });

    mongoose.model('User', UserSchema);

    //mongoose.connect('mongodb://localhost/example');

    User = mongoose.model('User');
*/


nconf.argv()
   .env()
   .file({ file: 'config.json' });

nconf.set('facebook:applicationId', '110978222254392');
nconf.set('facebook:applicationSecret', '9e4f3a9cc9e0eede180427cd333ebd3b');
/**
 * EVERYAUTH AUTHENTICATION
 * -------------------------------------------------------------------------------------------------
 * allows users to log in and register using OAuth services
 **/

everyauth.debug = true;

// Configure Facebook auth
var usersById = {},
    nextUserId = 0,
    usersByFacebookId = {},
    usersByTwitId = {},
    usersByLogin = {
        'user@example.com': addUser({ email: 'user@example.com', password: 'azure'})
    };
everyauth.everymodule.userPkey('_id');
everyauth.
    everymodule.
    findUserById(function (id, callback) {
        db.collection('users').findOne({
            _id: db.ObjectId(id)
        }, function(err, user) {
            //user.id = user._id;
            if(!err) {
                user = _.pick(user, [
                'username',
                'name',
                'email',
                'birthday',
                'city',
                'state',
                'country',
                'gender',
                'bio',
                'role',
                '_id'
                ]);
                callback(null, user);//usersById[id]);
            }
            else {
                callback(['Not found'], null);
            }
        });
    });
everyauth
    .password
        .extractExtraRegistrationParams( function (req) {
          return {
              name: {
                  first: req.body.name.first,
                  last: req.body.name.last
              },
              birthday: {
                month: req.body.birthday.month,
                day: req.body.birthday.day,
                year: req.body.birthday.year
              },
              city: req.body.city,
              state: req.body.state,
              gender: req.body.gender,
              bio: req.body.bio,
              auth_method: 'password',
              role: 'user'
          };
        });

everyauth
    .password
      .respondToLoginSucceed( function (res, user) {
        if (user) {
            res.send(_.pick(user, [
                'username',
                'name',
                'email',
                'birthday',
                'city',
                'state',
                'country',
                'gender',
                'bio',
                'role',
                '_id'
                ])
            );
          //this.redirect(res, "#");
        }
      })
    .respondToLoginFail( function(req, res, errors, login) {
        if (!errors || !errors.length) return;
        res.send(errors);
    });

everyauth
  .password
    .loginWith('email')
    .getLoginPath('/login')
    .postLoginPath('/login')
    .loginView('../app/views/login.jade')
    .authenticate( function (login, password) {
        console.log('authorization attempt for user: '+login+' // '+password);
      var errors = [],
        promise;
      if (!login) errors.push('Missing login');
      if (!password) errors.push('Missing password');
      if (errors.length) return errors;
      //var user = usersByLogin[login];
      var promise = this.Promise();

      db.collection('users').findOne({
            email : login
        }, function(err, user) {
            if (err) {
                errors.push(err.message || err);
                return promise.fulfill(errors);
            }
            console.log(user);
            bcrypt.compare(password, user.hash, function (err, didSucceed) {
                if (err) {
                  return promise.fail(err);
                  errors.push('Wrong password.');
                  return promise.fulfill(errors);
                }
                if (didSucceed) return promise.fulfill(user);
                errors.push('Wrong password.');
                return promise.fulfill(errors);
            });
      });
      return promise;
    })
  .loginSuccessRedirect('/#')
  .getRegisterPath('/register') // Uri path to the registration page
  .postRegisterPath('/register') // The Uri path that your registration form POSTs to
  .registerView('<p>Success!</p>')
  .validateRegistration( function (newUserAttrs) {
    // Validate the registration input
    // Return undefined, null, or [] if validation succeeds
    // Return an array of error messages (or Promise promising this array)
    // if validation fails
    //
    // e.g., assuming you define validate with the following signature
    // var errors = validate(login, password, extraParams);
    // return errors;
    //
    // The `errors` you return show up as an `errors` local in your jade template
    console.log(newUserAttrs);
    return null;
  })
  .registerUser( function (newUserAttrs) {
    var promise = this.Promise(),
      password = newUserAttrs.password;

    delete newUserAttrs[password]; // Don't store password
    newUserAttrs.salt = bcrypt.genSaltSync(10);
    newUserAttrs.hash = bcrypt.hashSync(password, newUserAttrs.salt);

    db.collection('users').save(newUserAttrs, {}, function(err, user){
        console.log('Created account for '+user.email);
        console.log(user);
        if (err) return promise.fail(err);
        return promise.fulfill(user);
    });

    return promise;
  })
  .registerSuccessRedirect('/#'); // Where to redirect to after a successful registration

  //console.log(everyauth.password);

/**
 * FACEBOOK AUTHENTICATION
 * -------------------------------------------------------------------------------------------------
 * uncomment this section if you want to enable facebook authentication.  To use this, you will need
 * to get a facebook application Id and Secret, and add those to settings.json.  See:
 * http://developers.facebook.com/
 **/

everyauth.
   facebook.
   appId(nconf.get('facebook:applicationId')).
   appSecret(nconf.get('facebook:applicationSecret')).
   findOrCreateUser(
 function(session, accessToken, accessTokenExtra, fbUserMetadata){
        var promise = this.Promise();
      db.collection('users').findOne({
            auth_id: fbUserMetadata.id
        }, function(err, user) {
            if (err) {
                errors.push(err.message || err);
                return promise.fulfill(errors);
            }
            else if(user) {
                console.log('Exists');
                console.log(user);
                return promise.fulfill(user);
            }
            else { 
                db.collection('users').save({
                    auth_method: 'facebook',
                    auth_id: fbUserMetadata.id,
                    auth_data: fbUserMetadata,
                    role: 'user',
                    name: {
                        first: fbUserMetadata.first_name,
                        last: fbUserMetadata.last_name
                    }
                }, {}, function(err, user){
                    console.log('Created FB account');
                    console.log(user);
                    if (err) return promise.fail(err);
                    return promise.fulfill(user);
                });
            }

      });
      return promise;
      /*
     return usersByFacebookId[fbUserMetadata.claimedIdentifier] ||
     (usersByFacebookId[fbUserMetadata.claimedIdentifier] =
      addUser('facebook', fbUserMetadata));*/
 }).
   redirectPath('/#');


/**
 * TWITTER AUTHENTICATION
 * -------------------------------------------------------------------------------------------------
 * uncomment this section if you want to enable twitter authentication.  To use this, you will need
 * to get a twitter key and secret, and add those to settings.json.  See:
 * https://dev.twitter.com/
 **/

everyauth
    .twitter
    .consumerKey(process.env.TWITTER_CONSUMER_KEY)
    .consumerSecret(process.env.TWITTER_CONSUMER_SECRET)
    .findOrCreateUser( function (sess, accessToken, accessSecret, twitUser) {
        return usersByTwitId[twitUser.id] || (usersByTwitId[twitUser.id] = addUser('twitter', twitUser));
    })
    .redirectPath('/#');

    nconf.save(function (err) {
    if (err) {
      console.error(err.message);
      return;
    }
    console.log('Configuration saved successfully.');
    });
// add a user to the in memory store of users.  If you were looking to use a persistent store, this
// would be the place to start
function addUser (source, sourceUser) {
    var user;
    if (arguments.length === 1) {
        user = sourceUser = source;
        user.id = ++nextUserId;
        return usersById[nextUserId] = user;
    } else { // non-password-based
        user = usersById[++nextUserId] = {id: nextUserId};
        user[source] = sourceUser;
    }
    return user;
}

app.use(express.bodyParser())
    .use(express.static(__dirname))
    .use(express.cookieParser())
    .use(express.session({ secret: 'idontknowwhatimdoing' }))
    .use(everyauth.middleware());

try {
  // use livereload middleware
  app.use(require('grunt-contrib-livereload/lib/utils').livereloadSnippet);
} catch(ex) {
  //no such thing in production
}

exports = module.exports = require('http').createServer(app);

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
app.get('/user', function(req, res) {
    if(req.user){
        res.send(req.user);
    }
    else {
        res.send();
    }
});

app.post('/vote', function(req, res) {
    if(!req.user) {
        return;
    }

    var todo = req.body.todo;
    delete req.body.todo;
    var params = req.body;
    params.user = req.user._id;

    db.collection('votes').find(params, function(err, votes) {
        if(!err) {
            if(!votes.length) {
                params.todo = todo;
                db.collection('votes').save(params, {}, function(err, votes) {
                    changeVote(todo, 1);
                    console.log(req.user.email+' voted for '+todo);
                });
            } else if(votes[0].todo === todo) {
                console.log(todo);
                console.log(votes[0].todo);
                console.log('revote discarded: '+votes[0].user+' voted for '+todo);
            } else {
                changeVote(votes[0].todo, -1);
                changeVote(todo, 1);
                db.collection('votes').findAndModify(
                    {
                        query: params,
                        update: { $set: { todo: todo } },
                    }, function(err) {
                        if(!err) {
                            console.log(req.user._id+' voted for '+todo);
                        }
                    });
            }
        }
    });
    //db.collection('todovotes')
});

function changeVote(todo, val) {
    db.collection('todos').findAndModify(
    {
        query: { slug: todo },
        update: { $inc: { votes: val }},
        new: true
    }, function (err, todo) {
        if(!err) {
            console.log('changeVote('+todo.slug+','+val+') ==> '+todo.votes);
        }
    });
}

app.post('/available', function(req, res) {
    //console.log(req.body);
    db.collection('users').find(req.body,
        function(err, user) {
            if(!err) {
                console.log(user);
                if(user.length)
                    res.send('false');
                else
                    res.send('true');
            }
        }); 
});


// Query
app.get('/api/:collection', function(req, res) { 
    var item, sort = {}, qw = {};
    for (item in req.query) {
        req.query[item] = (typeof +req.query[item] === 'number' && isFinite(req.query[item])) 
            ? parseFloat(req.query[item],10) 
            : req.query[item];
        if (item != 'limit' && item != 'skip' && item != 'sort' && item != 'order' && req.query[item] != "undefined") {
            qw[item] = ""+req.query[item]; 
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
});


// MapReduce
app.put('/api/:collection/mapReduce', function(req, res) {
    if (!req.body.options) {req.body.options  = {}};
    req.body.options.out = { inline : 1};
    req.body.options.verbose = false;
    db.collection(req.params.collection).mapReduce(req.body.map, req.body.reduce, req.body.options, fn(req, res));    
});

// Command (count, distinct, find, aggregate)
app.put('/api/:collection/:cmd',  function (req, res) {
    if (req.params.cmd === 'distinct') {req.body = req.body.key}
    db.collection(req.params.collection)[req.params.cmd](req.body, fn(req, res)); 
});
  app.use.apply(app, arguments);
};

/*
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
*/

exports.express = express;

function theNextGeneration(weeknessName, cb){
    db.collection('weeknesses').findAndModify({
        query: { name: weeknessName },
        update: { $inc: { generation:1 } },
        new: true }, 
        function(err, weekness) {
            db.collection('generations').save({
                generation: weekness.generation-1,
                todo: weekness._id,
                expired: new Date().getTime()
            });
            console.log(weekness);
            db.collection('todos').find(
                { weekness:weekness.name, generation:""+weekness.generation}).sort(
                    {votes:-1},
                    function(err, todos) {
                        if(err || !todos.length) return;
                        var todo = todos[0];
                        var expiration = parseInt(todo.duration) + new Date().getTime();
                        db.collection('todos').update(
                            {_id: todo._id},
                            { $set: { expires:expiration, current:todo._id }},
                            {},
                            function() {
                                var message = 'New todo:"'+todo.title+'" for '+weekness.name+'. Expires '+expiration;
                                var job = new cronJob(new Date(expiration), function(){
                                    theNextGeneration(weekness.name);
                                  }, function () {
                                    var message = 'Cron job finished for theNextGeneration('+weekness.name+')';
                                  }, 
                                  true
                                );
                                job.start();
                                if(cb) cb(message);
                                console.log(message);
                            })
                    });
    });
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.get('/admin', function (req, res) {
  res.render('admin',
  { title : 'Admin' }
  )
});
app.post('/theNextGeneration/:weekness', function (req, res) {
    theNextGeneration(req.params.weekness, function(data) {
        res.send(data);
    }); 

});