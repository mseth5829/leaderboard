var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var cors = require('cors')
var methodOverride = require('method-override')


app.use(cors());

app.set('view engine', 'ejs');
var staticPath = path.join(__dirname, 'static');
app.use(express.static(staticPath));
app.use(methodOverride('_method'));


app.use(bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var users = ["Stevie Gerrad","Michael Ballack","David Beckham"];
var scores = ["7948","6253","3"];
var ids = [0,1,2]

app.get('/', function(req,res){
  res.render('index', {user: users, score: scores, id: ids});
});

app.get('/data', function (req, res) {
  res.json({user: users, score: scores, id: ids})
})

app.get('/:id', function(req,res){
  var user = users[req.params.id];
  var score = scores[req.params.id];
  var id = ids[req.params.id];
  res.render('entry', {user: user, score: score, id: id});
});

app.get('/:id/edit', function(req,res){
  var user = users[req.params.id];
  var score = scores[req.params.id];
  var id = ids[req.params.id];
  res.render('entryEdit', {user: user, score: score, id: id});
});

app.post('/data', function(req,res){
  var newid = ids.length;
  ids.push(newid);
  users.push(req.body.user);
  scores.push(req.body.score);
  console.log(users)
  res.redirect('/');
});

app.put('/:id', function(req,res){
  var currentId = req.params.id;
  users[currentId] = req.body.user;
  scores[currentId] = req.body.score;
  res.redirect('/'+currentId);
});

app.delete('/:id', function(req,res){
  users.splice(req.params.id,1);
  scores.splice(req.params.id,1);
  ids.pop();
  res.redirect("/");
  console.log(users)
  console.log(ids)
})


app.listen(3000);
