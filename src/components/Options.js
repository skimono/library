import React, { Component } from 'react';
import firebase from 'firebase';
import { BasicButton } from '../styles.js';

class Options extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }))
      this.setState({ filename: image.name });
    }
  }

  // addImage = e => {
  //   e.preventDefault();

  //   var url = ''
  //   // var bookRef = firebase.firestore().collection("Authors").doc(this.props.books.authorid).collection('Books').doc(this.props.books.id);

  //   const { filename } = this.state;
  //   var storageRef = firebase.storage().ref('/images/' + filename);
  //   var uploadImage = storageRef.put(this.state.image);

  //   uploadImage.on('state_changed', function (snapshot) {
  //   }, function (error) {
  //   }, function () {
  //     uploadImage.snapshot.ref.getDownloadURL()
  //       .then((downloadURL) => {
  //         url = downloadURL
  //         bookRef.update({
  //           coverUrl: url
  //         }).then(() => console.log('Cover Added', url))
  //       })
  //   });
  // }

  render() {
    const { books } = this.props;

    return (

      <form onSubmit={this.addImage}>
        <input type="file" onChange={this.handleChange} />
        <select on>
          {books.map(b =>
            <option key={b.id}>
              {b.title} &mdash; {b.author}
            </option>
          )}
        </select>
        <BasicButton type="submit">
          Submit
      </BasicButton>
      </form>
    )
  }
}
export default Options;