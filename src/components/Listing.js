import React, { Component } from 'react'
import Books from './Books'

class Listing extends Component {

    render() {
        const { books } = this.props

        return (
            <div>
                <p>List of known books:</p>
                <ul>
                    {books.map(b =>
                        <Books key={b.id} books={b} />
                    )}
                </ul>
            </div>
        )
    }
}
export default Listing;