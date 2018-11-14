import React, {Component} from 'react'
import firebase from 'firebase'
import mergeByKey from 'array-merge-by-key';

var _ = require('lodash');

class Listing extends Component {
    
    
    state = {
        books: [],
        authors: [],
        list: []
    }

    list() {
        firebase.firestore()
            .collection('Books')
            .onSnapshot(querySnapshot => {
                const books = []
                querySnapshot.forEach(doc =>
                    books.push({id: doc.id, ...doc.data()})
                )
                this.setState({books: books})
            })

        firebase.firestore()
            .collection('Authors')
            .onSnapshot(querySnapshot => {
                const authors = []
                querySnapshot.forEach(doc =>
                    authors.push({author: doc.id, ...doc.data()})
                )
                this.setState({authors: authors})
            })

        this.setState.list = mergeByKey("author", this.state.books, this.state.authors);

    }

    render() {
        const {list} = this.state
        this.list()

        return(
            <div>
                <p>List of known books:</p>
                <ul>
                    {list.map(el =>
                        <li key={el.id}>
                            "{el.title}" &mdash; <i>{el.name}</i>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Listing;