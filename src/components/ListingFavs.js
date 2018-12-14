import React, { Component } from 'react'
import { Body } from '../styles.js';
import Favs from './Favs'

class Favourites extends Component {

    render() {
      const { books } = this.props

      return (
        <Body>
          <div>
            <p>List of your favourite books:</p>
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
                    <th>Favourite</th>
                </tr>
                {books.map(b =>
                    <Favs key={b.id} books={b} />
                )}
              </tbody>
            </table>
          </div>
        </Body>
    )
    }
}
export default Favourites;