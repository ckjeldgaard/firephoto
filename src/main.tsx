import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FirePhotoApp from './components/firephoto-app';

require('./sass/main.scss');

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js');
}

ReactDOM.render(
    <FirePhotoApp />,
    document.getElementById('app-main')
);
