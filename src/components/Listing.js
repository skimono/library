import React, { Component } from 'react'
import { Body } from '../styles.js';
import Books from './Books'

class Listing extends Component {

    render() {
        const { books } = this.props

        return (
            <Body>
                <div>
                    <p>List of known books:</p>
                    <table align="center">
                    <tbody>
                        <tr>
                            <th>Cover</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genre</th>
                            <th>Pages</th>
                            <th>Publisher</th>
                            <th>Language</th>
                            <th>Favorite</th>
                        </tr>
                        {books.map(b =>
                            <Books key={b.id} books={b} />
                        )}
                        </tbody>
                    </table>
                </div>
            </Body>
        )
    }
}
export default Listing;