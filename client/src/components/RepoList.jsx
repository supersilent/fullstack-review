import React from "react";

const RepoList = props => {
  let listitems = props.repos.map(repo => {
    return (
      <div>
        <h4>
        <img src={repo.avatar_url} style={{width:'50px',height:'50px'}}></img> <a href={repo.html_url}>{repo.name}</a>　 ⭐{repo.stargazers_count} 
        </h4>
        {repo.description}
      </div>
    );
  });

  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {listitems}
    </div>
  );
};

export default RepoList;
