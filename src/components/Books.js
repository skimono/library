import React, { Component } from 'react';

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: false
    };
  }
  onClickSetFav = () => {
    let favState = this.state.fav;
    favState = !favState;
    this.setState({ fav: favState });
    this.props.onClickSetFavHandler();
  };

  render() {
    const { books } = this.props;

    return (
      <React.Fragment>
        {books.map(book => {
          return (
            <div>
              <p>{book.id}</p> <p>{book.title}</p>
            </div>
          );
        })}

        <button onClick={this.onClickSetFav}>
          {this.state.fav ? (
            <i className="fas fa-heart" />
          ) : (
            <i className="far fa-heart" />
          )}
        </button>
      </React.Fragment>
    );
  }
}
export default Books;
