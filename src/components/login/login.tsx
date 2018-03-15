import * as React from 'react';
import {ReactNode} from 'react';
import Snackbar from '../snackbar/snackbar';

export interface LoginProps {
    firebase: firebase.app.App;
}

export interface LoginState {
    email: string;
    password: string;
    errorVisible: boolean;
    errorMsg: string;
}

export default class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            email: '',
            password: '',
            errorVisible: false,
            errorMsg: ''
        };

        this.onSignInClick = this.onSignInClick.bind(this);
    }

    private onSignInClick(event: any): void {
        console.log('onSignInClick', this.state.email);
        console.log('onSignInClick', this.state.password);

        this.props.firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((c) => {
                console.log('Logged in = ', c);
                window.location.replace('/firephoto/#/file');
            })
            .catch((error) => {
                console.error('Error = ', error);
                this.setState({
                    errorVisible: true,
                    errorMsg: 'Login failed!'
                });
            });
    }

    private updateEmail(evt: any): void {
        this.setState({
            email: evt.target.value
        });
    }

    private updatePwd(evt: any): void {
        this.setState({
            password: evt.target.value
        });
    }

    render(): ReactNode {
        return <div className='login'>
            <h1>Login</h1>
                <div>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' placeholder='Email' required={true} value={this.state.email} onChange={evt => this.updateEmail(evt)} />
                </div>
                <div>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' placeholder='Password' required={true} value={this.state.password} onChange={evt => this.updatePwd(evt)} />
                </div>
                <button className='btn--raised btn--accent' onClick={this.onSignInClick}>Sign in</button>
            <Snackbar visible={this.state.errorVisible} message={this.state.errorMsg} />
        </div>;
    }
}
