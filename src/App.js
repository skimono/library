import React, {Component} from 'react'
import Login from './components/Login'
import AddBook from './components/AddingBooks'
import Books from './components/Books'
import firebase from 'firebase'

var config = {
//firebase setup
}
firebase.initializeApp(config)


class App extends Component {

  state = {
    isLoggedIn: false,
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
     (user) => this.setState({isLoggedIn: !!user})
    )

    const settings = {timestampsInSnapshots: true}
    firebase.firestore().settings(settings)
  }
 
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    const {isLoggedIn} = this.state

    if(!isLoggedIn) {
      return (
          <Login/>)
    } else {
      return (
        <div className='app'>
          <h1>Expedition</h1>
          <p>Welcome {firebase.auth().currentUser.displayName}! You are now logged-in!</p>
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
          <AddBook/>
          <br/>
          <Books/>
        </div>
      )
    }
  }
}

export default App
