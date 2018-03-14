import * as React from 'react';
import {ReactNode} from 'react';
const uuidv1 = require('uuid/v1');

export interface FileProps {
    storage: firebase.storage.Storage;
}
export interface FileState {
    displayUpload: boolean;
    uploadResult: string;
}

export default class File extends React.Component<FileProps, FileState> {

    private _fileField: any;
    private _previewField: any;
    private fileReader = new FileReader();

    constructor(props: FileProps) {
        super(props);
        this.state = {
            displayUpload: false,
            uploadResult: ''
        };
        this.onFileChosen = this.onFileChosen.bind(this);
        this.onUpload = this.onUpload.bind(this);
    }

    private onFileChosen(event: any): void {
        this.fileReader.readAsDataURL(this._fileField.files[0]);
        this.fileReader.onload = (ev) => {
            this._previewField.src = (ev.target as FileReader).result;
        };

        this.setState({displayUpload: true});
    }

    private onUpload(event: any): void {
        this.fileReader.readAsDataURL(this._fileField.files[0]);
        this.fileReader.onload = (ev) => {
            const storageRef = this.props.storage.ref();
            const photosRef = storageRef.child('photos/' + uuidv1() + '.jpg');

            photosRef.putString((ev.target as FileReader).result, 'data_url').then((snapshot) => {
                console.log('Uploaded a data_url string!', snapshot);
                this.setState({uploadResult: 'Image successfully uploaded!'});
            }).catch(reason => {
                console.error('Couldnt upload image', reason);
                this.setState({uploadResult: 'Upload failed'});
            });

        };
    }

    render(): ReactNode {
        return <div className='file'>
            <input type='file' accept='image/*' id='capture' className='captureInput' capture={true} ref={(f) => {this._fileField = f; }} onChange={this.onFileChosen} />
            <label htmlFor='capture' id='capture-label' />
            <img ref={(p) => {this._previewField = p; }} />
            <button className={this.state.displayUpload ? 'btn--raised btn--accent display' : 'btn--raised btn--accent'} onClick={this.onUpload}>Upload</button>
            <p>{this.state.uploadResult}</p>
        </div>;
    }

}
