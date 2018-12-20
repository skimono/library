import React, { Component } from 'react';
import firebase from 'firebase'

class Favs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false,
    };
  }

  componentDidMount() {
    let favState = this.state.fav;
    if (this.props.books.favedBy.includes(firebase.auth().currentUser.uid)) {
      favState = !favState;
      this.setState({ fav: favState })
    }
  }

  onClickSetFav = () => {
    let favState = this.state.fav;

    var booksRef = firebase.firestore().collection("Authors").doc(this.props.books.authorid).collection('Books').doc(this.props.books.id);
    this.state.fav ? (
      booksRef.update({
        favedBy: firebase.firestore.FieldValue.arrayRemove(firebase.auth().currentUser.uid)
      }).then(() => console.log('Book unfaved'))
    ) : (
        booksRef.update({
          favedBy: firebase.firestore.FieldValue.arrayUnion(firebase.auth().currentUser.uid)
        }).then(() => console.log('Book faved'))
      )

    favState = !favState;
    this.setState({ fav: favState });
  };

  render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        {this.state.fav ? (
        <tr>
          <td>
            <img src={books.coverUrl} alt={books.title + ' cover'} height='300' width='225' />
          </td>
          <td>{books.title}</td>
          <td>{books.author}</td>
          <td>{books.genre}</td>
          <td>{books.pages}</td>
          <td>{books.publisher}</td>
          <td>{books.language}</td>
          <td><button onClick={this.onClickSetFav}>
            {this.state.fav ? (
              <i className="fas fa-heart" />
            ) : (
              <i className="far fa-heart" />
            )}
          </button></td>
        </tr>
        ) : ( null )}
      </React.Fragment>
    );
  }
}
export default Favs;
