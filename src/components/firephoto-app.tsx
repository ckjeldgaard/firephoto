import * as React from 'react';
import {ReactNode} from 'react';
import Header from './header/header';
import ContentArea from './content-area/content-area';
import {Route} from 'react-router';

export interface FirePhotoAppProps {
    firebase: firebase.app.App;
}

export default class FirePhotoApp extends React.Component<FirePhotoAppProps> {

    public static readonly TITLE: string = 'FirePhoto';

    render(): ReactNode {
        return <div>
            <Route render={(props) => {
                return (
                    <Header title={FirePhotoApp.TITLE} />
                );
            }} />
            <ContentArea firebase={this.props.firebase} />
        </div>;
    }
}
