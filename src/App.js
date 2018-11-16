import React, { Component } from 'react';
import Login from './components/Login';
import AddingBook from './components/AddingBooks';
import firebase from 'firebase';
import { Wrapper, Header, Title, Greeting, BasicButton } from './styles.js';

var config = {
  //firebase setup
  apiKey: 'AIzaSyDb6MxVPz02Dzu6TBU6uRMZk6lSfsEuH8E',
  authDomain: 'solwit-pjatk-arc-2018-gr3.firebaseapp.com',
  databaseURL: 'https://solwit-pjatk-arc-2018-gr3.firebaseio.com/',
  projectId: 'solwit-pjatk-arc-2018-gr3',
  storageBucket: 'solwit-pjatk-arc-2018-gr3.appspot.com',
  messagingSenderId: '314895835823'
};
firebase.initializeApp(config);

class App extends Component {
  state = {
    isLoggedIn: false,
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isLoggedIn: !!user }));
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    const { isLoggedIn } = this.state;

    if (!isLoggedIn) {
      return <Login />;
    } else {
      return (
        <Wrapper>
          <Header>
            <Title>Library test app for Expedition project</Title>
            <Greeting>
              Welcome {firebase.auth().currentUser.displayName}! You are now logged-in!
            </Greeting>
            <BasicButton onClick={() => firebase.auth().signOut()}>Logout</BasicButton>
          </Header>
            <AddingBook />
        </Wrapper>
      );
    }
  }
}

export default App;
