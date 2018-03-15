import * as React from 'react';
import {ReactNode} from 'react';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import {Upload} from '../../model/upload';
import {AppUser} from '../../model/appuser';
import Snackbar from '../snackbar/snackbar';

const uuidv1 = require('uuid/v1');

export interface FileProps {
    firebase: firebase.app.App;
}
export interface FileState {
    displayUpload: boolean;
    uploadResult: string;
    errorVisible: boolean;
    errorMsg: string;
}

export default class File extends React.Component<FileProps, FileState> {

    private _fileField: any;
    private _previewField: any;
    private fileReader = new FileReader();
    private currentUser: AppUser;

    constructor(props: FileProps) {
        super(props);
        this.state = {
            displayUpload: false,
            uploadResult: '',
            errorVisible: false,
            errorMsg: ''
        };
        this.onFileChosen = this.onFileChosen.bind(this);
        this.onUpload = this.onUpload.bind(this);

        this.currentUser = new AppUser('', '');
        this.props.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                const email = (user.email != null) ? user.email : '';
                this.currentUser = new AppUser(user.uid, email);
            }
        });
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
            const storageRef = this.props.firebase.storage().ref();
            const photosRef = storageRef.child('photos/' + uuidv1() + '.jpg');

            photosRef.putString((ev.target as FileReader).result, 'data_url').then((snapshot: UploadTaskSnapshot) => {

                const upload = new Upload(
                    snapshot.metadata.downloadURLs[0],
                    this.currentUser.getUid(),
                    this.currentUser.getEmail()
                );

                this.writeUploadToDatabase(upload);

                this.setState({uploadResult: 'Image successfully uploaded!'});
            }).catch(reason => {
                console.error('Upload failed', reason);
                this.setState({
                    uploadResult: 'Upload failed',
                    errorVisible: true,
                    errorMsg: reason.message
                });
            });

        };
    }

    private writeUploadToDatabase(upload: Upload): void {
        const db: firebase.firestore.Firestore = this.props.firebase.firestore();
        const key: string = db.collection('uploads').doc().id;

        db.collection('uploads').doc(key)
            .set(upload.toObject())
            .then(() => {
                console.log('Document successfully written!');
            })
            .catch((error) => {
                console.error('Error writing document: ', error);
                this.setState({
                    errorVisible: true,
                    errorMsg: error.toString()
                });
            });
        db.collection('user-uploads').doc(upload.getUid())
            .set(upload.toObject());

    }

    render(): ReactNode {
        return <div className='file'>
            <input type='file' accept='image/*' id='capture' className='captureInput' ref={(f) => {this._fileField = f; }} onChange={this.onFileChosen} />
            <label htmlFor='capture' id='capture-label' />
            <img ref={(p) => {this._previewField = p; }} />
            <button className={this.state.displayUpload ? 'btn--raised btn--accent display' : 'btn--raised btn--accent'} onClick={this.onUpload}>Upload</button>
            <p>{this.state.uploadResult}</p>
            <Snackbar visible={this.state.errorVisible} message={this.state.errorMsg} />
        </div>;
    }

}
