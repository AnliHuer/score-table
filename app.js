var express = require('express');
var app = express();
var hbs = require('hbs');
var bodyParser = require('body-parser');
var parseScores = require('./parse_scores.js');
app.use(express.static('public'));
app.use(express.static('bower_components'));
app.set('view engine', 'html');
app.engine('html', hbs.__express);
var mysql = require('mysql');
var connection;


app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(res, req, next) {
  connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '000000',
    database: 'student_score'
  });
  connection.connect(function(err) {
    next();
  });
});


app.get('/', function(req, res) {
  connection.query(
    'select scores.score_id,students.student_id,students.student_name,course.course_name,scores.score from students,scores,course where students.student_id = scores.student_id and course.course_id = scores.course_id',
    function(err, rows, fields) {
      if (err) throw err;
      rows = parseScores(rows);
      res.render('index', {
        scores: rows
      });
      connection.end();
    });
});


app.delete('/delete', function(req, res) {
  var id = req.query.id;
  var sql = 'delete from scores where student_id =' + id;
  connection.query(sql,
    function(err, rows, fields) {
      if (err) throw err;
      res.send('true');
      connection.end();
    });
});



app.post('/add', function(req, res) {
  var sql = 'insert into students(student_name) values("' + req.body.name + '")';
  connection.query(sql, function(err, rows, fields) {
    if (err) throw err;
    var id = rows.insertId;
    var sql2 = 'insert into scores(student_id,course_id,score) values(' + id + ',1,' + req.body.chinese + '),(' + id + ',2,' + req.body.math + '),(' + id + ',3,' + req.body.english + ')';
    connection.query(sql2, function(err, rows, fields) {
      if (err) throw err;
      res.send({id:id});
      connection.end();
    });
  });
});


app.get('/scores', function(req, res) {
  var obj = req.query;
  connection.query(
    'select scores.score_id,students.student_id,students.student_name,course.course_name,scores.score from students,scores,course where students.student_id = scores.student_id and course.course_id = scores.course_id',
    function(err, rows, fields) {
      if (err) throw err;
      rows = parseScores(rows);
      rows.sort(function(a, b) {
        return (a[obj.sortKey] - b[obj.sortKey]) * obj.sortFlag;
      });
      res.send(rows);
      connection.end();
    });
});

app.listen(3000);
