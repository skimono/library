import React, { Component } from 'react';
import { GithubLogin } from '../styles';
class OAuth extends React.Component {


  componentDidMount () {
    const oauthScript = document.createElement("script");
    oauthScript.src = "https://cdn.rawgit.com/oauth-io/oauth-js/c5af4519/dist/oauth.js";

    document.body.appendChild(oauthScript);
  }

	handleClick(e) {
    e.preventDefault();

    window.OAuth.initialize('4775b5b5aa6d05b4aa22');
    window.OAuth.popup('github').then((github) => {
      github.me().then((data) => {
        alert("Your Github email: " + data.email + ".\nCheck console logs for more info.");
      });
      github.get('/user').then(data => {
      });
    });
  }

  render() {
    return <GithubLogin onClick={this.handleClick.bind(this)}>
             Sign in with {this.props.name}
           </GithubLogin>;
  }
}

export default OAuth;