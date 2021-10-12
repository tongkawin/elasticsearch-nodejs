var client = require("./connection.js");
var express = require('express');
var app = express();
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/search-id/:id', function (req, res) {

  client.search({
    index: 'search-articles',
    type: 'articles',
    body: {
      "query": {
        "match_phrase": {
          "ID" : { query: req.params.id, slop: 100 }
        }
      }
    }

  }).then(function (resp) {
    console.log("Successful query! Here is the response:", resp);
    res.send(resp);
  }, function (err) {
    console.trace(err.message);
    res.send(err.message);
  });
});


app.get('/search-title/:title', function (req, res) {


  client.search({
    index: 'search-articles',
    type: 'articles',
    body: {
      "query": {
        "match_phrase": {
          "Title": { query: req.params.title, slop: 100 }
        }
      }
    }

  }).then(function (resp) {
    console.log("Successful query! Here is the response:", resp);
    res.send(resp);
  }, function (err) {
    console.trace(err.message);
    res.send(err.message);
  });
});



app.listen(3000, function () {
  console.log('App listening for requests...');
});