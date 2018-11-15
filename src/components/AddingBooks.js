import React, {Component} from 'react'
import firebase from 'firebase'

class AddBook extends Component {

    constructor() {
        super();
        this.state = {
         title: [],
         author: '',
         pages: '',
         genre: '',
         image: null,
         filename: '',
         url: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = e => {
        if(e.target.files[0]) {
            const image = e.target.files[0];
            this.setState(() => ({image}))
            this.setState({ filename: image.name});
            this.setState({ url: ('/image/' + image.name) });
        }
    }

    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    addBook = e => {
        e.preventDefault();
        const { filename } = this.state;

        var storageRef = firebase.storage().ref('/images/' + filename);
        var uploadImage = storageRef.put(this.state.image);

        uploadImage.on('state_changed', function(snapshot){

        }, function(error) {

        }, function() {
            console.log('Image added')
        });


        firebase.firestore().collection('Books').add({
          title: this.state.title,
          author: this.state.author,
          pages: this.state.pages,
		  genre: this.state.genre,
          addedBy: firebase.auth().currentUser.uid,
          coverUrl: this.state.url
        })
        .then(() => console.log('Document added')); 

        this.setState({
          title: '',
          author: '',
          pages: '',
          genre: ''
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
                onChange={this.updateInput}
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
                name="pages"
                placeholder="Number of pages"
                onChange={this.updateInput}
                value={this.state.pages}
                />
                <input
                type="text"
                name="genre"
                placeholder="Genre"
                onChange={this.updateInput}
                value={this.state.genre}
                />
                <input type="file"
                onChange={this.handleChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
        );
    }

}
export default AddBook;