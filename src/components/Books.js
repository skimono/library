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
    console.log(this.props.book.id)
  };

  render() {
    const { book } = this.props;

    return (
      <React.Fragment>
      <ul>
        <li>{book.id}</li>
        <li>{book.title}</li>
        <li>{book.author}</li>

        <button onClick={this.onClickSetFav}>
          {this.state.fav ? (
            <div><i className="fas fa-heart" /></div>
          ) : (
            <i className="far fa-heart" />
          )}
        </button>
        </ul>
      </React.Fragment>
    );
  }
}
export default Books;
