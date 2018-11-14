import React, { Component } from 'react';
import firebase from 'firebase';
import Authors from './Authors';

class Listing extends Component {
  state = {
    authors: [],
    isFaved: false
  };

  list() {
    firebase
      .firestore()
      .collection('Authors')
      .onSnapshot(querySnapshot => {
        const authors = [];
        querySnapshot.forEach(doc =>
          authors.push({ id: doc.id, ...doc.data() })
        );
        this.setState({ authors });
      });
  }

  setFav = id => {
    console.log(id);
  };

  render() {
    const { authors } = this.state;
    this.list();

    return (
      <React.Fragment>
        <div>
          <Authors key={authors.id} authors={authors} />
        </div>
      </React.Fragment>
    );
  }
}
export default Listing;
