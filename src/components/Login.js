import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import { Wrapper, Header, Title, Greeting} from '../styles.js';
import GitHubLogin from 'react-github-login';


const onSuccess = response => console.log(response);
const onFailure = response => console.error(response);
const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

class Login extends Component {
  render() {
    return (
      <Wrapper>
          <Header>
            <Title>Library test app for Expedition project</Title>
            <Greeting>Please Log-in:</Greeting>
            {
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />

            }
            <div>
            <GitHubLogin clientId="4775b5b5aa6d05b4aa22"
              redirectUri=""
              onSuccess={onSuccess}
              onFailure={onFailure}
              />
            </div>
          </Header>
      </Wrapper>
    );
  }
}

export default Login;