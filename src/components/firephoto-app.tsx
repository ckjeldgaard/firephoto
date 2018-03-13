import * as React from 'react';
import {ReactNode} from 'react';
import Header from './header/header';
import ContentArea from './content-area/content-area';

export interface FirePhotoAppProps {
    storage: firebase.storage.Storage;
}

export default class FirePhotoApp extends React.Component<FirePhotoAppProps> {

    public static readonly TITLE: string = 'FirePhoto';

    render(): ReactNode {
        return <div>
            <Header title={FirePhotoApp.TITLE} />
            <ContentArea storage={this.props.storage} />
        </div>;
    }
}
