import React, {Component} from 'react'
import firebase from 'firebase'

class AddBook extends Component {

    constructor() {
        super();
        this.state = {
         title: '',
         author: '',
        };
    }

    updateInput = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
    }

    addBook = e => {
        e.preventDefault();

        firebase.firestore().collection('Books').add({
          title: this.state.title,
          author: this.state.author,
          addedBy: firebase.auth().currentUser.uid  
        })
        .then(() => console.log('Document added')); 

        this.setState({
          title: '',
          author: '',  
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
                <button type="submit">Submit</button>
            </form>
        </div>
        );
    }

}
export default AddBook;