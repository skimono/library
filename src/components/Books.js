import React, {Component} from 'react'
import firebase from 'firebase'
import Book from './Book'

class Books extends Component {
    
    state = {
        elements: [],
        isFaved: false
    };

    list(){
        firebase.firestore()
            .collection('Authors')
            .onSnapshot(querySnapshot => {
                const elements = []
                querySnapshot.forEach(doc =>
                    elements.push({id: doc.id, ...doc.data()})
                )
                this.setState({elements})
            })
    }

    setFav = id => {
        console.log(id)
    }

    render() {
        const {elements} = this.state
        this.list()

        return(
            <ul>
                {elements.map(e =>
                     <li key={e.id}>
                        {<Book book={e} onClickSetFavHandler = {this.setFav.bind(this, e.id)} /> }
                    </li>
                )}
            </ul>
        )
    }
}
export default Books;