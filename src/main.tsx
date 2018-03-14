import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as Firebase from 'firebase';
import FirePhotoApp from './components/firephoto-app';
import { HashRouter } from 'react-router-dom';

// Required for side-effects
require('firebase/firestore');

require('./sass/main.scss');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

const config = {
    apiKey: 'AIzaSyC1SGjQtkb1Jscf59qRM6PMlm9vB254qJk',
    authDomain: 'realtime-a0da4.firebaseapp.com',
    databaseURL: 'https://realtime-a0da4.firebaseio.com',
    projectId: 'realtime-a0da4',
    storageBucket: 'realtime-a0da4.appspot.com',
    messagingSenderId: '558844606511'
};



const firebase = Firebase.initializeApp(config, 'firephoto');

ReactDOM.render(
    <HashRouter>
      <FirePhotoApp firebase={firebase} />
    </HashRouter>,
    document.getElementById('app-main')
);
