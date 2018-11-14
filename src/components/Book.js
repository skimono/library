import React, {Component} from 'react'

class Book extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
        fav: false,
        book: this.props.book.split('')
        // title: this.props.title,
        // author: this.props.author,
        // genre: this.props.genre,
        // year: this.props.year,
        // pages: this.props.pages,
        // cover: this.props.cover
      };

    }
    onClickSetFav = () => {
        let favState = this.state.fav;
        favState = !favState;
        this.setState({fav: favState});
        this.props.onClickSetFavHandler();
    }

    render() {
        const {book} = this.state

        return (
            <React.Fragment>
                {' '}

                {
                    book.map((b) => {
                       return <li key={b.id}>b.id</li>
                    })
                }

                <button onClick={this.onClickSetFav}>

                    {(this.state.fav)?<i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}
                </button>
            </React.Fragment>
        )
    }
}
export default Book;