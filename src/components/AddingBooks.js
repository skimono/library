import React, { Component } from 'react'
import firebase from 'firebase'
import Listing from './Listing';
import { FormErrors } from './FormErrors';
import { BasicButton, BasicInput, SubHeader, Body } from '../styles.js';


class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: [],
            books: [],
            title: '',
            author: '',
            genre: '',
            paperback: '',
            publisher: '',
            language: '',
            image: null,
            filename: '',
            url: '',
            formErrors: {
                title: '',
                author: '',
                genre: '',
                paperback: '',
                publisher: '',
                language: ''
            },
            titleValid: false,
            authorValid: false,
            genreValid: false,
            paperbackValid: false,
            publisherValid: false,
            languageValid: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }))
            this.setState({ filename: image.name });
            this.setState({ url: '/images/' + image.name });
        }
    }

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

    componentDidMount() {
        const settings = { timestampsInSnapshots: true };
        firebase.firestore().settings(settings);

        var db = firebase.firestore()
        db.collection('Authors')
            .get().then(querySnapshot => {
                const authors = []
                querySnapshot.forEach(doc =>
                    authors.push({ id: doc.id, ...doc.data() })
                )
                this.setState({ authors: authors })
                const books = []
                this.state.authors.forEach(author =>
                    db.collection('Authors').doc(author.id).collection('Books')
                        .get().then(querySnapshot => {
                            querySnapshot.forEach(doc =>
                                books.push({
                                    id: doc.id,
                                    authorid: author.id,
                                    author: author.name,
                                    ...doc.data()
                                })
                            )
                            this.setState({ books: books })
                        })
                )
            })
        console.log('Got Books')
    }

    addToDb = e => {
        e.preventDefault();
        const { filename } = this.state;

        var storageRef = firebase.storage().ref('/images/' + filename);
        var uploadImage = storageRef.put(this.state.image);

        uploadImage.on('state_changed', function (snapshot) {
        }, function (error) {
        }, function () {
            var downloadURL = uploadImage.snapshot.ref.getDownloadURL()
                .then(function (downloadURL) {
                    console.log('File available at', downloadURL);
                })
        });

        let author = this.state.author
        var flag = null
        this.state.authors.map(function (e) {
            if (e.name == author) { flag = e.id }
        })
        var db = firebase.firestore().collection('Authors')
        if (flag == null) {
            db.add({
                name: this.state.author,
                addedBy: firebase.auth().currentUser.uid
            }).then(docRef => {
                console.log('Author added', docRef.id);
                db.doc(docRef.id).collection('Books').add({
                    title: this.state.title,
                    genre: this.state.genre,
                    paperback: this.state.paperback,
                    publisher: this.state.publisher,
                    language: this.state.language,
                    coverUrl: this.state.url,
                    favedBy: []
                }).then(docRef => console.log('Book added', docRef.id)).then(() => {
                    window.location.reload();
                });
            })
        } else {
            db.doc(flag).collection('Books').add({
                title: this.state.title,
                genre: this.state.genre,
                paperback: this.state.paperback,
                publisher: this.state.publisher,
                language: this.state.language,
                coverUrl: this.state.url,
                favedBy: []
            }).then(docRef => console.log('Book added', docRef.id)).then(() => {
                window.location.reload();
            });
        }


    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let authorValid = this.state.authorValid;
        let genreValid = this.state.genreValid;
        let paperbackValid = this.state.paperbackValid;
        let publisherValid = this.state.publisherValid;
        let languageValid = this.state.languageValid;

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
                languageValid
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
                this.state.languageValid
        });
    }

    render() {

        return (
            <React.Fragment>
                <SubHeader>
                    <div>
                        <p>Add additional books:</p>
                        <form onSubmit={this.addToDb}>
                            <BasicInput
                                type="text"
                                name="title"
                                placeholder="Title"
                                onChange={this.updateInput}
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
                            <input type="file" onChange={this.handleChange} />
                            <div>
                                <BasicButton type="submit" disabled={!this.state.formValid}>
                                    Submit
                            </BasicButton>
                            </div>
                        </form>
                        <FormErrors formErrors={this.state.formErrors} />
                    </div>
                    <br />
                </SubHeader>
                <Body>
                    <Listing books={this.state.books} />
                </Body>
            </React.Fragment>
        );
    }

}
export default AddBook;