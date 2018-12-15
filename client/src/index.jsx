import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }

  }
  componentDidMount(){
    console.log('componentDidMount');
    let repos;
    $.ajax({
      method: 'GET',
      url: '/repos',
      dataType: 'json'
    }).done(
      (data) => {repos = data;
        this.setState({repos})
      }
    )
    
  }


  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      method: 'POST',
      url: '/repos',
      data: { username: term}
    }).done(
      () => {console.log('Username sent.')}
    )

    // TODO:

  }

  render () {
    console.log(this.state.repos);
    if (this.state.repos.length){
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  } else {
      return (<div><Search onSearch={this.search.bind(this)}/></div>)
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));