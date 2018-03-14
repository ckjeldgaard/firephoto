import * as React from 'react';
import {ReactNode} from 'react';
import Camera from '../camera/camera';
import {Route, Switch} from 'react-router';
import Login from '../login/login';
import File from '../file/file';

export interface ContentAreaProps {
    firebase: firebase.app.App;
}

export default class ContentArea extends React.Component<ContentAreaProps> {

  render(): ReactNode {
    return <article>
        <Switch>
            <Route exact path='/' render={() => <Login firebase={this.props.firebase} />} />
            <Route exact path='/camera' render={() => <Camera storage={this.props.firebase.storage()} />} />
            <Route exact path='/file' render={() => <File storage={this.props.firebase.storage()} />} />
        </Switch>
    </article>;
  }

}
