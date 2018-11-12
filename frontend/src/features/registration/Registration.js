import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Header from '../../components/UI/Header/Header';
import {registrationActionCreators} from './registration.actionCreators';
import getMessage from '../../common/utilities/messages';

import '../../common/css/common.css';
import './Registration.css';

class Registration extends Component{
    //
    // TODO - Togliere assolutamente gli onChange.
    //

    state = {
        username: '',
        password: '',
        passwordConfirm: '',
        usernameInputError: false,
        usernameInputErrorMessage: '',
        passwordInputError: false,
        passwordInputErrorMessage: '',
        passwordConfirmInputError: false,
        passwordConfirmInputErrorMessage: ''
    };

    resetErrorsForm(){
        const initialErrorsForm = {
            usernameInputError: false,
            usernameInputErrorMessage: '',
            passwordInputError: false,
            passwordInputErrorMessage: '',
            passwordConfirmInputError: false,
            passwordConfirmInputErrorMessage: ''
        };

        this.setState(initialErrorsForm);
    }

    onUsernameInputChange(event){
        event.preventDefault();
        const usernameInput = event.target.value;
        this.setState({username: usernameInput});
    }

    onPasswordInputChange(event){
        event.preventDefault();
        const passwordInput = event.target.value;
        this.setState({password: passwordInput});
    }

    onPasswordConfirmedInputChange(event){
        event.preventDefault();
        const passwordConfirmedInput = event.target.value;
        this.setState({passwordConfirm: passwordConfirmedInput});
    }

    onSubmitForm(event){
        event.preventDefault();
        this.resetErrorsForm();
        this.props.resetUsernameErrorState();

        const username = this.state.username;
        const password = this.state.password;
        const passwordConfirm = this.state.passwordConfirm;
        const whiteSpaceValidation = RegExp('^ *$');
        const usernameValidation = RegExp('^\\w+$');
        const passwordValidation = RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$');

        if(!username || whiteSpaceValidation.test(username)){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'Inserisci l\'username!',
            });
        }
        else if(username.length < 3){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'L\'username è minore di 3 caratteri!',
            });
        }
        else if(username.length > 50){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'L\'username è maggiore di 50 caratteri!',
            });
        }
        else if(!usernameValidation.test(username)){
            this.setState({
                usernameInputError: true,
                usernameInputErrorMessage: 'L\'username può contenere solo numeri lettere ed underscore!',
            });
        }
        else if(!password || whiteSpaceValidation.test(password)){
            this.setState({
                passwordInputError: true,
                passwordInputErrorMessage: 'Inserisci la password!',
            });
        }
        else if(!passwordValidation.test(password)){
            this.setState({
                passwordInputError: true,
                passwordInputErrorMessage: 'La password deve avere almeno 8 caratteri, una lettera maiuscola, una minuscola, un numero, ed un carattere speciale.',
            });
        }
        else if(!passwordConfirm || whiteSpaceValidation.test(passwordConfirm)){
            this.setState({
                passwordConfirmInputError: true,
                passwordConfirmInputErrorMessage: 'Inserisci la password!'
            });
        }
        else if(password !== passwordConfirm){
            this.setState({
                passwordConfirmInputError: true,
                passwordConfirmInputErrorMessage: 'Le password sono diverse!'
            });
        }
        else{
            this.props.userRegistration(username, password);
        }
    }

    render(){
        let usernameInvalidFeedback = null;

        if(this.state.usernameInputError){
            usernameInvalidFeedback = <div className="invalid-feedback">{this.state.usernameInputErrorMessage}</div>;
        }
        else if(this.props.isUsernameUsed){
            usernameInvalidFeedback = <div className="invalid-feedback">{getMessage(this.props.registrationErrorCode)}</div>;
        }

        return(
            <div className="background-image">
                <div className="container">
                    <div className="row">
                        <div className="form-container registration-container col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1">
                            <Header classes="header-registration-form"/>

                            <p>
                                Inserisci un username ed una password per registrarti.
                            </p>

                            <form className="registration-form" onSubmit={(event) => this.onSubmitForm(event)}>
                                <div className={"form-group " + (this.state.usernameInputError || this.props.isUsernameUsed ? "has-danger" : "")}>
                                    <label htmlFor="usernameInput">Username:</label>
                                    <input
                                        type="text"
                                        className={"form-control " + (this.state.usernameInputError || this.props.isUsernameUsed ? "is-invalid" : "")}
                                        id="usernameInput"
                                        aria-describedby="usernameHelp"
                                        placeholder="Username"
                                        onChange={(event) => this.onUsernameInputChange(event)}
                                    />
                                    {usernameInvalidFeedback}
                                </div>

                                <div className={"form-group " + (this.state.passwordInputError ? "has-danger" : "")}>
                                    <label htmlFor="passwordInput">Password:</label>
                                    <input
                                        type="password"
                                        className={"form-control " + (this.state.passwordInputError ? "is-invalid" : "")}
                                        id="passwordInput"
                                        aria-describedby="passwordHelp"
                                        placeholder="Password"
                                        onChange={(event) => this.onPasswordInputChange(event)}
                                    />
                                    <div className="invalid-feedback">{this.state.passwordInputErrorMessage}</div>
                                </div>

                                <div className={"form-group " + (this.state.passwordConfirmInputError ? "has-danger" : "")}>
                                    <label htmlFor="passwordConfirmInput">Conferma password:</label>
                                    <input
                                        type="password"
                                        className={"form-control " + (this.state.passwordConfirmInputError ? "is-invalid" : "")}
                                        id="passwordConfirmInput"
                                        aria-describedby="passwordConfirmHelp"
                                        placeholder="Password"
                                        onChange={(event) => this.onPasswordConfirmedInputChange(event)}
                                    />
                                    <div className="invalid-feedback">{this.state.passwordConfirmInputErrorMessage}</div>
                                </div>

                                <button className="btn btn-primary button-registration-form">Registrati</button>
                                <NavLink to="/login">
                                    <input type="button" value="Login" className="btn btn-primary button-registration-form"/>
                                </NavLink>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isUsernameUsed: state.registration.isUsernameUsed,
        registrationErrorCode: state.registration.registrationErrorCode
    };
};

const mapDispatchToProps = dispatch => {
    return{
        userRegistration: (username, password) => dispatch(registrationActionCreators.userRegistration(username, password)),
        resetUsernameErrorState: () => dispatch(registrationActionCreators.resetUsernameErrorState())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);