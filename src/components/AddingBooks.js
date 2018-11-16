import React, { Component } from 'react'
import firebase from 'firebase'
import Listing from './Listing';

class AddBook extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: [],
            author: '',
            image: null,
            filename: '',
            url: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({ image }))
            this.setState({ filename: image.name });
            this.setState({ url: ('/image/' + image.name) });
        }
    }

    updateInput = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    updateInputTable = e => {
        this.setState({
            [e.target.name]: [e.target.value]
        });
    }

    addToDb = e => {
        e.preventDefault();
        const { filename } = this.state;

        var storageRef = firebase.storage().ref('/images/' + filename);
        var uploadImage = storageRef.put(this.state.image);

        uploadImage.on('state_changed', function (snapshot) {
        }, function (error) {
        }, function () {
            console.log('Image added')
        });

        let author = this.state.author
        var flag = null
        this.props.authors.map(function (e) {
            if (e.name == author) { flag = e.id }
        })
        var db = firebase.firestore().collection('Authors')
        if (flag == null) {
            db.add({
                name: this.state.author,
            }).then(docRef => {
                console.log('Author added', docRef.id);
                db.doc(docRef.id).collection('Books').add({
                    title: this.state.title,
                    coverUrl: this.state.url,
                    favedBy: []
                }).then(docRef => console.log('Book added', docRef.id)).then(() => {
                    this.setState({
                        title: [],
                        author: '',
                        image: null,
                        filename: '',
                        url: ''
                    })
                })
            })
        } else {
            db.doc(flag).collection('Books').add({
                title: this.state.title,
                coverUrl: this.state.url,
                favedBy: []
            }).then(docRef => console.log('Book added', docRef.id)).then(() => {
                this.setState({
                    title: [],
                    author: '',
                    image: null,
                    filename: '',
                    url: ''
                })
                flag = null;
            })
        }


    };

    render() {

        return (
            <React.Fragment>
                <div>
                    <p>Add additional books:</p>
                    <form onSubmit={this.addToDb}>
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
                        <input type="file"
                            onChange={this.handleChange}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <p>{this.props.books.author}</p>
                <br />
                <Listing books={this.props.books} />
            </React.Fragment>
        );
    }

}
export default AddBook;