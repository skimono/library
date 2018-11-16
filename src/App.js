import React, { Component } from 'react';
import Login from './components/Login';
import AddingBook from './components/AddingBooks';
import firebase from 'firebase';

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
    authors: [],
    books: []
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged(user => this.setState({ isLoggedIn: !!user }));

    const settings = { timestampsInSnapshots: true };
    firebase.firestore().settings(settings);

    var db = firebase.firestore()
    db.collection('Authors')
      .onSnapshot(querySnapshot => {
        const authors = []
        querySnapshot.forEach(doc =>
          authors.push({ id: doc.id, ...doc.data() })
        )
        this.setState({ authors: authors })
        const books = []
        this.state.authors.forEach(author =>
          db.collection('Authors').doc(author.id).collection('Books')
            .get().then(querySnapshot => {

              querySnapshot.forEach(doc =>
                books.push({
                  id: doc.id,
                  authorid: author.id,
                  author: author.name,
                  ...doc.data()
                })
              )
              this.setState({ books: books })
            })
        )
      })
    console.log('Got Books')
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
        <div className="app">
          <h1>Expedition</h1>
          <p>
            Welcome {firebase.auth().currentUser.displayName}! You are now
            logged-in!
          </p>
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
          
          <AddingBook authors={this.state.authors} books={this.state.books} />
        </div>
      );
    }
  }
}

export default App;
