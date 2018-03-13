import * as React from 'react';
import {ReactNode} from 'react';
import * as Firebase from 'firebase';
let firebaseui = require('firebaseui');

export interface LoginProps {
    firebase: firebase.app.App;
}

export default class Login extends React.Component<LoginProps> {

    constructor(props: LoginProps) {
        super(props);

        const ui = new firebaseui.auth.AuthUI(this.props.firebase.auth());

        const uiConfig = {
            callbacks: {
                signInSuccess: (currentUser: any, credential: any, redirectUrl: any) => {
                    // User successfully signed in.
                    // Return type determines whether we continue the redirect automatically
                    // or whether we leave that to developer to handle.
                    return true;
                },
                uiShown: () => {
                    // The widget is rendered.
                    // Hide the loader.
                    // document.getElementById('loader').style.display = 'none';
                }
            },
            // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
            signInFlow: 'popup',
            signInSuccessUrl: '#/camera',
            signInOptions: [
                Firebase.auth.EmailAuthProvider.PROVIDER_ID
            ],
            // Terms of service url.
            tosUrl: '<your-tos-url>'
        };


        ui.start('#firebaseui-auth-container', uiConfig);
    }

    render(): ReactNode {
        return <div>
            <h1>Login</h1>
            <div id='firebaseui-auth-container' />
        </div>;
    }
}
