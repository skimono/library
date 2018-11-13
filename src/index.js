import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase';
import config from './config/firebase'

firebase.initializeApp(config)

const firestore = firebase.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings);

ReactDOM.render(<App/>, document.getElementById('root'))
