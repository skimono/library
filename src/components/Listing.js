import React, {Component} from 'react'
import firebase from 'firebase'

class Listing extends Component {
    
    state = {
        books: []
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
    }

    render() {
        const {books} = this.state
        this.list()

        return(
            <div>
                <p>List of known books:</p>
                <ul>
                    {books.map(b =>
                        <li key={b.id}>
                            "{b.title}" &mdash; <i>{b.author}</i>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Listing;