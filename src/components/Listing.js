import React, { Component } from 'react';
import firebase from 'firebase';
import Books from './Books';

class Listing extends Component {
  state = {
    books: [],
    isFaved: false
  };

  list() {
    firebase
      .firestore()
      .collection('Books')
      .onSnapshot(querySnapshot => {
        const books = [];
        querySnapshot.forEach(doc => books.push({ id: doc.id, ...doc.data() }));
        this.setState({ books });
      });
  }

  setFav = id => {
    console.log(id);
  };

  render() {
    const { books } = this.state;
    this.list();

    return (
      <React.Fragment>
        <div>
          <Books key={books.id} books={books} />
        </div>
      </React.Fragment>
    );
  }
}
export default Listing;
