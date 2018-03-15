import * as React from 'react';
import {ReactNode} from 'react';

export interface SnackbarProps {
    visible: boolean;
    message: string;
}

export interface SnackbarState {
    visible: boolean;
}

export default class Snackbar extends React.Component<SnackbarProps, SnackbarState> {

    constructor(props: SnackbarProps) {
        super(props);
        this.state = {
            visible: this.props.visible
        };
    }

    componentWillReceiveProps(nextProps: SnackbarProps): void {
        if (nextProps.visible) {
            this.setState({visible: true});
            setTimeout(() => {
                this.setState({visible: false});
            }, 3000);
        } else {
            this.setState({visible: false});
        }
    }

    render(): ReactNode {
        return <div id='snackbar' className={this.state.visible ? 'show' : ''}>
            {this.props.message}
            </div>;
    }

}
