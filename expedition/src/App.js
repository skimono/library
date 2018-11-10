// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';
import './App.css'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDb6MxVPz02Dzu6TBU6uRMZk6lSfsEuH8E",
    authDomain: "solwit-pjatk-arc-2018-gr3.firebaseapp.com",
    databaseURL: "https://solwit-pjatk-arc-2018-gr3.firebaseio.com",
    projectId: "solwit-pjatk-arc-2018-gr3",
    storageBucket: "solwit-pjatk-arc-2018-gr3.appspot.com",
    messagingSenderId: "314895835823"
  };
  firebase.initializeApp(config);

class SignInScreen extends React.Component {

  // The component's Local state.
  state = {
    isSignedIn: false // Local signed-in state.
  };

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
        (user) => this.setState({isSignedIn: !!user})
    );
  }
  
  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <div>
          <h1>My App</h1>
          <p>Please sign-in:</p>
          <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
        </div>
      );
    }
    return (
      <div>
        <h1>My App</h1>
        <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
        <a className="signOut" onClick={() => firebase.auth().signOut()} href="">Sign-out</a>
      </div>
    );
  }
}

export default SignInScreen;
