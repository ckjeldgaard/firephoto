import * as React from 'react';
import {ReactNode} from 'react';

export interface CameraProps {
    storage: firebase.storage.Storage;
}
export interface CameraState {
    displayBtn: boolean;
}

export default class Camera extends React.Component<CameraProps, CameraState> {

    private _video: any;
    private _canvas: any;

    constructor(props: CameraProps) {
        super(props);
        this.state = {displayBtn: false};

        this.onCameraClick = this.onCameraClick.bind(this);
        this.onUpload = this.onUpload.bind(this);
        this.handleSuccess = this.handleSuccess.bind(this);

        console.log('storage = ', this.props.storage);
    }

    private handleSuccess(stream: MediaStream): void {
        console.log('success', stream);
        console.log('_video', this._video);
        console.log(this._video.constructor.name);
        this._video.srcObject = stream;
        this.setState({displayBtn: true});
    }

    private handleError(error: any): void {
        console.error('error', error);
    }

    private onCameraClick(event: any): void {
        if (this.hasGetUserMedia()) {

            const hdConstraints = {
                video: {width: {min: 1280}, height: {min: 720}}
            };

            navigator.mediaDevices.getUserMedia(hdConstraints).
            then(this.handleSuccess).catch(this.handleError);
        } else {
            console.error('getUserMedia() is not supported by your browser');
        }
    }

    private onUpload(event: any): void {
        this._canvas.width = this._video.videoWidth;
        this._canvas.height = this._video.videoHeight;
        this._canvas.getContext('2d').drawImage(this._video, 0, 0);

        const storageRef = this.props.storage.ref();
        const photosRef = storageRef.child('photos/samle.png');
        // const message = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
        const message = this._canvas.toDataURL('image/png');
        photosRef.putString(message, 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!', snapshot);
        }).catch(reason => {
            console.error('Couldnt upload image', reason);
        });

    }

    private hasGetUserMedia(): boolean {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    render(): ReactNode {
        return <div className='camera'>
            <button id='camera' onClick={this.onCameraClick} />
            <label htmlFor='camera'>Click the camera icon!</label>
            <video autoPlay ref={(vid) => {this._video = vid; }} />
            <canvas ref={(c) => {this._canvas = c; }} />
            <button id='capture-button' className={this.state.displayBtn ? 'display' : ''} onClick={this.onUpload}>Capture</button>
        </div>;
    }

}
