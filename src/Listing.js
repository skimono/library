import React, {Component} from 'react'
import firebase from 'firebase'

class Listing extends Component {
    
    state = {
        elements: []
    }

    list(){
        firebase.firestore()
            .collection('Books')
            .onSnapshot(querySnapshot => {
                const elements = []
                querySnapshot.forEach(doc =>
                    elements.push({id: doc.id, ...doc.data()})
                )
                this.setState({elements: elements})
            })
    }

    render() {
        const {elements} = this.state
        this.list()

        return(
            <div>
                <p>List of known books:</p>
                <ul>
                    {elements.map(el =>
                        <li key={el.id}>
                            "{el.title}" &mdash; <i>{el.author}</i>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}
export default Listing;