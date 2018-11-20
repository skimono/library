import React, { Component } from 'react';

class CreateNotification extends Component {
  constructor(props) {
    super();
    this.state = { value: 'Dodano okładkę' };
    this.notificationService = props.notificationService;

    this.sendNotification = this.sendNotification.bind(this);
  }

  sendNotification() {
    this.notificationService.emit(this.state.value + new Date().toTimeString);
  }

  onLoad() {
    this.props.onLoad(this.state.value);
  }

  render() {
    return (
      <div>
        <h4>Create Notification</h4>

        {this.sendNotification}
      </div>
    );
  }
}

export default CreateNotification;
