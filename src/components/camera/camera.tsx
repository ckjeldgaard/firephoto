import * as React from 'react';
import {ReactNode} from 'react';

export default class Camera extends React.Component {

    private video: any = null;

    constructor(props: {}) {
        super(props);
        this.onCameraClick = this.onCameraClick.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);
    }

    private handleSuccess(stream: MediaStream): void {
        console.log('success', stream);
        console.log('video', this.video);
        this.video.srcObject = stream;
    }

    private handleError(error: any): void {
        console.error('error', error);
    }

    private onCameraClick(event: any): void {
        console.log('onCameraClick', event);
        if (this.hasGetUserMedia()) {
            console.log('onCameraClick. has get user media');
            navigator.mediaDevices.getUserMedia({video: true}).
            then(this.handleSuccess).catch(this.handleError);
        } else {
            console.error('getUserMedia() is not supported by your browser');
        }
    }

    private hasGetUserMedia(): boolean {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    render(): ReactNode {
        return <div className='camera'>
            <button id='camera' onClick={this.onCameraClick} />
            <label htmlFor='camera'>Click the camera icon!</label>
            <video autoPlay ref={(vid) => {this.video = vid; }} />
            <img src='' />
            <canvas />
        </div>;
    }

}
