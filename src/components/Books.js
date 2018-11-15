import React, { Component } from 'react';
import firebase from 'firebase'

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false,
    };
  }

  componentDidMount() {
    // let favState = this.state.fav;
    // if (this.props.book.favedBy.includes(firebase.auth().currentUser.uid)) {
    //   favState = !favState;
    //   this.setState({ fav: favState })
    // }
  }

  onClickSetFav = () => {
    let favState = this.state.fav;
    
    var booksRef = firebase.firestore().collection("Authors").doc(this.props.book.id).collection('Books').doc(this.props.book.id);
    this.state.fav ? (
    booksRef.update({
    	favedBy: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
    	}).then(() => console.log('Book unfaved'))
    ):(
    booksRef.update({
    	favedBy: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
    	}).then(() => console.log('Book faved'))
    )
    
    favState = !favState;
    this.setState({ fav: favState });
  };

  render() {
    const { book } = this.props;

    return (
      <React.Fragment>
        <table>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Favorite</th>
          </tr>
            <td>{book.title}</td>
	          <td>{book.author}</td>
	      <td><button onClick={this.onClickSetFav}>
	        {this.state.fav ? (
	          <i className="fas fa-heart" />
	       	  ) : (
	          <i className="far fa-heart" />
	        )}
	      </button></td>
	    </table>
      </React.Fragment>
    );
  }
}
export default Books;
