import React, { Component } from 'react'
import firebase from 'firebase'
import Listing from './Listing';
import Favourites from './ListingFavs';
import { FormErrors } from './FormErrors';
import { BasicButton, BasicInput, SubHeader } from '../styles.js';
import { Router } from "@reach/router";


class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorid: ' ',
            bookid: ' ',
            authors: [],
            books: [],
            title: '',
            author: '',
            genre: '',
            pages: '',
            publisher: '',
            language: '',
            image: null,
            filename: '',
            formErrors: {
                title: '',
                author: '',
                genre: '',
                pages: '',
                publisher: '',
                language: ''
            },
            titleValid: false,
            authorValid: false,
            genreValid: false,
            pagesValid: false,
            publisherValid: false,
            languageValid: false
        };
        this.addToDb = this.addToDb.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }))

            var currentdate = new Date();
            var currenttime = currentdate.getDate() + "-"
            + (currentdate.getMonth() + 1) + "-"
            + currentdate.getFullYear() + "_"
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds() + "_"
            + firebase.auth().currentUser.uid;
            var filenametemp = this.state.filename.split('.')
            var roz = filenametemp.pop()
            this.setState({ filename: (currenttime + roz) })
            console.log(this.state.filename)
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
            .onSnapshot(querySnapshot => {
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

    addBook(db, docAdr, url) {
        console.log('Author added', docAdr);
        db.doc(docAdr).collection('Books').add({
            title: this.state.title,
            genre: this.state.genre,
            pages: this.state.pages,
            publisher: this.state.publisher,
            language: this.state.language,
            coverUrl: url,
            favedBy: []
        }).then(docRef => console.log('Book added', docRef.id)).then(() => {
            // window.location.reload();
        });
    }

    addImage(url) {
        var bookRef = firebase.firestore().collection("Authors").doc(this.state.authorid).collection('Books').doc(this.state.bookid);

        const { filename } = this.state;

        var storageRef = firebase.storage().ref('/images/' + filename);
        var uploadImage = storageRef.put(this.state.image);

        uploadImage.on('state_changed', function (snapshot) {
        }, function (error) {
        }, function () {
            uploadImage.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    url = downloadURL
                    bookRef.update({
                        coverUrl: url
                    }).then(() => console.log('Cover Added', url))
                })
        });
    }

    addToDb = e => {
        e.preventDefault();

        var url = null
        const { filename } = this.state;
        var storageRef = firebase.storage().ref('/images/' + filename);
        var uploadImage = storageRef.put(this.state.image);

        uploadImage.on('state_changed', function (snapshot) {
        }, function (error) {
        }, function () {
            uploadImage.snapshot.ref.getDownloadURL()
                .then((downloadURL) => {
                    url = downloadURL
                    console.log('Cover Added', url)
                })
        });

        let author = this.state.author
        var flag = null                                     // eslint-disable-next-line
        this.state.authors.map(function (e) {               // eslint-disable-next-line
            if (e.name == author) {                         
                flag = e.id
                console.log('author id from flag', flag)
            }
        })

        setTimeout(() => {
            console.log(flag)
            var db = firebase.firestore().collection('Authors')
            if (flag == null) {
                db.add({
                    name: this.state.author,
                    addedBy: firebase.auth().currentUser.uid
                }).then(docRef => {
                    this.addBook(db, docRef.id, url);
                })
            } else {
                this.addBook(db, flag, url);
            }
        }, 3000);

    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let authorValid = this.state.authorValid;
        let genreValid = this.state.genreValid;
        let pagesValid = this.state.pagesValid;
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
            case 'pages':
                pagesValid = value.match('^[0-9]+$') && !value.match('^[0]+');
                fieldValidationErrors.Pages = pagesValid
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
                pagesValid,
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
                this.state.pagesValid &&
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
                                name="pages"
                                placeholder="Pages"
                                onChange={this.updateInput}
                                value={this.state.pages}
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
                    <br />
                </SubHeader>
                <Router>
                    <Listing path="/" books={this.state.books} />
                    <Favourites path="/favs" books={this.state.books}/>
                </Router>
            </React.Fragment>
        );
    }

}
export default AddBook;
