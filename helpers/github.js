const request = require('request');
const config = require('../config');
const db = require('../database/index')

let getReposByUsername = (username) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'https://api.github.com/users/'+ username + '/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      const repos = JSON.parse(body);
      db.save(repos);
    }
  }

  request(options,callback);

}

module.exports.getReposByUsername = getReposByUsername;