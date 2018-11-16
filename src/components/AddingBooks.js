import React, { Component } from 'react';
import firebase from 'firebase';
import { FormErrors } from './FormErrors';
import { BasicButton, BasicInput } from '../styles.js';
import styled from 'styled-components';

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
      publicationDate: '',
      image: null,
      filename: '',
      url: '',
      formErrors: {
        title: '',
        author: '',
        genre: '',
        paperback: '',
        publisher: '',
        language: '',
        publicationDate: ''
      },
      titleValid: false,
      authorValid: false,
      genreValid: false,
      paperbackValid: false,
      publisherValid: false,
      languageValid: false,
      publicationDateValid: false
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
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        [name]: value
      },
      () => {
        this.validateField(name, value);
      }
    );
  };

  updateInputTable = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(
      {
        [name]: [value]
      },
      () => {
        this.validateField(name, value);
      }
    );
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
              publicationDate: '',
              image: null,
              filename: '',
              url: ''
            });
          });
      });
  };

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.titleValid;
    let authorValid = this.state.authorValid;
    let genreValid = this.state.genreValid;
    let paperbackValid = this.state.paperbackValid;
    let publisherValid = this.state.publisherValid;
    let languageValid = this.state.languageValid;
    let publicationDateValid = this.state.publicationDateValid;

    switch (fieldName) {
      case 'title':
        titleValid = value.length >= 1;
        fieldValidationErrors.Title = titleValid ? '' : ' is missing';
        break;
      case 'author':
        authorValid = value.length >= 1;
        fieldValidationErrors.Author = authorValid ? '' : ' is missing';
        break;
      case 'genre':
        genreValid = value.length >= 3 && !value.match('[0-9]+'); //s-f
        fieldValidationErrors.Genre = genreValid
          ? ''
          : ' is too short or contains number';
        break;
      case 'paperback':
        paperbackValid = value.match('^[0-9]+$') && !value.match('^[0]+');
        fieldValidationErrors.Paperback = paperbackValid
          ? ''
          : ' must contain number';
        break;
      case 'publisher':
        publisherValid = value.length >= 3;
        fieldValidationErrors.Publisher = publisherValid ? '' : ' is too short';
        break;
      case 'language':
        languageValid = value.length >= 2; //PL
        fieldValidationErrors.Language = languageValid ? '' : ' is too short';
        break;
      case 'publicationDate':
        publicationDateValid = true; // do poprawy
        fieldValidationErrors.Publication_Date = publicationDateValid
          ? ''
          : ' is in incorrect format';
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        titleValid,
        authorValid,
        genreValid,
        paperbackValid,
        publisherValid,
        languageValid,
        publicationDateValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.titleValid &&
        this.state.authorValid &&
        this.state.genreValid &&
        this.state.paperbackValid &&
        this.state.publisherValid &&
        this.state.languageValid &&
        this.state.publicationDateValid
    });
  }

  render() {
    return (
      <div>
        <p>Add additional books:</p>
        <form onSubmit={this.addBook}>
          <BasicInput
            type="text"
            name="title"
            placeholder="Title"
            onChange={this.updateInputTable}
            value={this.state.title}
          />
          <BasicInput
            type="text"
            name="author"
            placeholder="Author"
            onChange={this.updateInput}
            value={this.state.author}
          />
          <BasicInput
            type="text"
            name="genre"
            placeholder="Genre"
            onChange={this.updateInput}
            value={this.state.genre}
          />
          <BasicInput
            type="text"
            name="paperback"
            placeholder="Paperback"
            onChange={this.updateInput}
            value={this.state.paperback}
          />
          <BasicInput
            type="text"
            name="publisher"
            placeholder="Publisher"
            onChange={this.updateInput}
            value={this.state.publisher}
          />
          <BasicInput
            type="text"
            name="language"
            placeholder="Language"
            onChange={this.updateInput}
            value={this.state.language}
          />
          <BasicInput
            type="text"
            name="publicationDate"
            placeholder="Publication date (dd-mm-yyyy)"
            onChange={this.updateInput}
            value={this.state.publicationDate}
          />
          <input type="file" onChange={this.handleChange} />
          <div>
          <BasicButton type="submit" disabled={!this.state.formValid}>
            Submit
          </BasicButton>
          </div>
        </form>
        <FormErrors formErrors={this.state.formErrors} />
      </div>
    );
  }
}
export default AddBook;
