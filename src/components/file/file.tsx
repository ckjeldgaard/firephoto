import * as React from 'react';
import {ReactNode} from 'react';

export interface FileProps {
    storage: firebase.storage.Storage;
}

export default class File extends React.Component<FileProps> {

    render(): ReactNode {
        return <div>
            <h1>File</h1>
            <input type='file' accept='image/*' id='capture' capture={true} />
        </div>;
    }

}
