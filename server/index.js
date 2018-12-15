const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let github = require('../helpers/github');
let db = require('../database/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let username = req.body.username;
  github.getReposByUsername(username);
  res.end('');
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  let repos = db.get((repos)=>{
    res.send(JSON.stringify(repos));
  });

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

