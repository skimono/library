import React, { Component } from 'react';
import firebase from 'firebase';

class AddBook extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      author: '',
      genre: '',
      paperback: '',
      publisher: '',
      language: '',
      readingLevel: '',
      publicationDate: '',
      image: null,
      filename: '',
      url: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
      this.setState({ filename: image.name });
      this.setState({ url: '/image/' + image.name });
    }
  };

  updateInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  updateInputTable = e => {
    this.setState({
      [e.target.name]: [e.target.value]
    });
  };

  addBook = e => {
    e.preventDefault();
    const { filename } = this.state;

    var storageRef = firebase.storage().ref('/images/' + filename);
    var uploadImage = storageRef.put(this.state.image);

    uploadImage.on(
      'state_changed',
      function(snapshot) {},
      function(error) {},
      function() {
        console.log('Image added');
      }
    );

    firebase
      .firestore()
      .collection('Authors')
      .add({
        name: this.state.author,
        addedBy: firebase.auth().currentUser.uid
      })
      .then(docRef => {
        console.log('Author added', docRef.id);
        firebase
          .firestore()
          .collection('Authors')
          .doc(docRef.id)
          .collection('Books')
          .add({
            title: this.state.title,
            genre: this.state.genre,
            paperback: this.state.paperback,
            publisher: this.state.publisher,
            language: this.state.language,
            readingLevel: this.state.readingLevel,
            publicationDate: this.state.publicationDate,
            coverUrl: this.state.url,
            favedBy: []
          })
          .then(docRef => console.log('Book added', docRef.id))
          .then(() => {
            this.setState({
              title: [],
              author: '',
              genre: '',
              paperback: '',
              publisher: '',
              language: '',
              readingLevel: '',
              publicationDate: '',
              image: null,
              filename: '',
              url: ''
            });
          });
      });
  };

  render() {
    return (
      <div>
        <p>Add additional books:</p>
        <form onSubmit={this.addBook}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.updateInputTable}
            value={this.state.title}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={this.updateInput}
            value={this.state.author}
          />
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            onChange={this.updateInput}
            value={this.state.genre}
          />
          <input
            type="text"
            name="paperback"
            placeholder="Paperback"
            onChange={this.updateInput}
            value={this.state.paperback}
          />
          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            onChange={this.updateInput}
            value={this.state.publisher}
          />
          <input
            type="text"
            name="language"
            placeholder="Language"
            onChange={this.updateInput}
            value={this.state.language}
          />
          <input
            type="text"
            name="readingLevel"
            placeholder="Reading Level"
            onChange={this.updateInput}
            value={this.state.readingLevel}
          />
          <input
            type="text"
            name="publicationDate"
            placeholder="Publication date"
            onChange={this.updateInput}
            value={this.state.publicationDate}
          />
          <input type="file" onChange={this.handleChange} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default AddBook;
