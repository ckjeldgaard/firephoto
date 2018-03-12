import * as React from 'react';
import {ReactNode} from 'react';
import Camera from '../camera/camera';

export default class ContentArea extends React.Component {

  render(): ReactNode {
    return <article>
      <Camera />
    </article>;
  }

}
