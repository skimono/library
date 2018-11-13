import React, {Component} from 'react'
import Login from './login'
import firebase from 'firebase'

var config = {

}
firebase.initializeApp(config)

class App extends Component {

  state = {
    isLoggedIn: false
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
     (user) => this.setState({isLoggedIn: !!user})
    )
  }
 
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    const {isLoggedIn} = this.state

    if(!isLoggedIn) {
      return (
        <div>
          <h1>Expedition</h1>
          <p>Please Log-in:</p>
        <Login/>
        </div>)
    } else {
      return (
        <div className='app'>
          <h1>Expedition</h1>
          <p>Welcome {firebase.auth().currentUser.displayName}! You are now loged-in!</p>
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </div>
      )
    }
  }
}

export default App