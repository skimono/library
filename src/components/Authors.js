import React, { Component } from 'react';
import Books from './Books';
import firebase from 'firebase';

class Authors extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  list() {
    firebase
      .firestore()
      .collection(`Authors/${this.props.author.id}/Books`)
      .onSnapshot(querySnapshot => {
        const books = [];
        querySnapshot.forEach(doc => books.push({ id: doc.id, ...doc.data() }));
        this.setState({ books });
      });
  }

  render() {
    const { authors } = this.props;
    const { books } = this.state;

    return (
      <React.Fragment>
        {authors.map(author => {
          firebase
            .firestore()
            .collection(`Authors/${author.id}/Books`)
            .onSnapshot(querySnapshot => {
              const books = [];
              querySnapshot.forEach(doc =>
                books.push({ id: doc.id, ...doc.data() })
              );
              this.setState({ books });
            });

          return (
            <React.Fragment>
              <p>{author.name}</p>
              <div>
                <Books
                  key={books.id}
                  books={books}
                  //onClickSetFavHandler={this.setFav.bind(this, books.id)}
                />
              </div>
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}
export default Authors;
