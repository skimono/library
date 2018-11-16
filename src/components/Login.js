import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';
import firebase from 'firebase';
import { Wrapper, Header, Title, Greeting} from '../styles.js';

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
          </Header>
      </Wrapper>
    );
  }
}

export default Login;
