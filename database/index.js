const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/fetcher');

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  id: {
    type: Number,
    index: true,
    unique: true
  },
  name: String,
  full_name: String,
  owner_id: Number,
  html_url: String,
  description: String,
  url: String,
  stargazers_count: Number,
  avatar_url: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  for (const e of repos) {
    let repo = new Repo({
      id: e.id,
      name: e.name,
      full_name: e.full_name,
      owner_id: e.owner.id,
      html_url: e.html_url,
      description: e.description,
      url: e.url,
      stargazers_count: e.stargazers_count,
      avatar_url: e.owner.avatar_url
    });

    repo.save(function (err, repo) {
      if (err) return console.error(err);
      // console.log('repo:', repo);
    });
  }

}

let get = (callback) => {
  Repo.find(function (err, repositories) {
    if (err) return console.error(err);
  }).sort('-stargazers_count').limit(25).exec((err, repositories)=>{
    console.log(repositories);
    callback(repositories);
  })
}

module.exports.save = save;
module.exports.get = get;
