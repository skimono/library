import React, { Component } from 'react';

class DisplayNotification extends Component {
  constructor(props) {
    super();

    this.state = { notification: '' };

    this.stopNotification = this.stopNotification.bind(this);

    this.notificationService = props.notificationService;
    this.subscription = this.notificationService.notify().subscribe(res => {
      this.setState({ notification: res });
    });
  }

  render() {
    let notification = this.state.notification;
    return (
      <div>
        <h4>Display notifications</h4>
        <div>{notification}</div>
        <button onClick={this.stopNotification}>Stop</button>
      </div>
    );
  }

  stopNotification() {
    this.subscription.unsubscribe();
  }
}

export default DisplayNotification;
