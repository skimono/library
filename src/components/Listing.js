import React, { Component } from 'react'
import Books from './Books'

class Listing extends Component {

    render() {
        const { books } = this.props

        return (
            <div>
                <p>List of known books:</p>
                <table>
                <tbody>
                    <tr>
                        <th>Cover</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Favorite</th>
                    </tr>
                    {books.map(b =>
                        <Books key={b.id} books={b} />
                    )}
                     </tbody>
                </table>
            </div>
        )
    }
}
export default Listing;