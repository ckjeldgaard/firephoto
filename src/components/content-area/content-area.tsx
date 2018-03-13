import * as React from 'react';
import {ReactNode} from 'react';
import Camera from '../camera/camera';

export interface ContentAreaProps {
    storage: firebase.storage.Storage;
}

export default class ContentArea extends React.Component<ContentAreaProps> {

  render(): ReactNode {
    return <article>
      <Camera storage={this.props.storage} />
    </article>;
  }

}
