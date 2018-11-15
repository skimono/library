import React, { Component } from 'react';
import firebase from 'firebase'

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false,
    };
  }
  
  state = {
      faved: []
  }
  
  checkIfFaved (user) {
  		firebase.firestore()
            .collection('Books')
            .where("favedBy", "==", user)
            .onSnapshot(querySnapshot => {
                const faved = []
                querySnapshot.forEach(doc =>
                    faved.push({id: doc.id})
                )
                this.setState({faved: faved})
            })
  }
  
  onClickSetFav = () => {
    let favState = this.state.fav;
    
    var booksRef = firebase.firestore().collection("Books").doc(this.props.book.id);
    this.state.fav ? (
    booksRef.update({
    	favedBy: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
    	})
    ):(
    booksRef.update({
    	favedBy: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
    	})
    )
    
    favState = !favState;
    this.setState({ fav: favState });
    console.log(this.props.book.id)
  };

  render() {
    const { book } = this.props;
	this.checkIfFaved(firebase.auth().currentUser.uid);

    return (
      <React.Fragment>
        <li>
	      {book.title} &mdash; {book.author}{' '}
	      <button onClick={this.onClickSetFav}>
	        {this.state.fav ? (
	          <i className="fas fa-heart" />
	       	  ) : (
	          <i className="far fa-heart" />
	        )}
	      </button>
	    </li>
      </React.Fragment>
    );
  }
}
export default Books;
