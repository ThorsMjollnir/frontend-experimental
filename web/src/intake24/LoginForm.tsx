import * as React from "react";
import {connect} from "react-redux";
import {Client} from "intake24-redux-client";
import {Store, Unsubscribe} from "redux";

export interface LoginFormProps {
    requestPending: boolean;
    signinCallback: (email: string, password: string) => void;
}

export interface LoginFormState {
    email: string;
    password: string;
}

export class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

    constructor(props) {
        super(props);

        this.state = {email: "", password: ""};
    }

    onSigninClicked() {
        this.props.signinCallback(this.state.email, this.state.password);
    }

    onEmailChanged(event) {
        this.setState({email: event.target.value});
    }

    onPasswordChanged(event) {
        this.setState({password: event.target.value});
    }

    render() {

        return <div>
            E-mail: <input type="text" value={this.state.email}
                           onChange={this.onEmailChanged.bind(this)}/>
            Password: <input type="text" value={this.state.password}
                             onChange={this.onPasswordChanged.bind(this)}/>
            <input disabled={this.props.requestPending} type="button" value="Sign in"
                   onClick={this.onSigninClicked.bind(this)}/>
        </div>
    }
}

export interface LoginFormConnectedProps {
    client: Client;
}

export const LoginFormConnected = connect((s: any, ownProps: LoginFormConnectedProps) => {
    return {
        requestPending: ownProps.client.getState().signinRequestPending,
        signinCallback: ownProps.client.signin.bind(ownProps.client)
    }
})(LoginForm);

/*
export interface LoginFormReduxProps {
    store: Store<any>;
    client: Client;
}

export interface LoginFormReduxState {
    unsubscribe?: Unsubscribe;
}

export class LoginFormRedux extends React.Component<LoginFormReduxProps, LoginFormReduxState> {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <LoginForm requestPending={this.props.client.getState().signinRequestPending}
                          signinCallback={this.props.client.signin.bind(this.props.client)}/>
    }

    componentDidMount() {
        let unsubscribe = this.props.store.subscribe(() => {
            this.setState(prevState => prevState);
        });

        this.setState({unsubscribe: unsubscribe});
    }

    componentWillUnmount() {
        if (this.state.unsubscribe) {
            this.state.unsubscribe();
            this.setState({unsubscribe: null});
        }
    }
}*/