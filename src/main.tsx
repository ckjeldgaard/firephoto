import * as React from 'react';
import * as ReactDOM from 'react-dom';
import FirePhotoApp from './components/firephoto-app';

require('./sass/main.scss');

ReactDOM.render(
    <FirePhotoApp />,
    document.getElementById('app-main')
);
