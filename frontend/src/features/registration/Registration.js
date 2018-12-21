import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Header from '../../components/UI/Header/Header';
import {registrationActionCreators} from './registration.actionCreators';
import getMessage from '../../common/utilities/messages';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ModalMessage from '../../components/UI/Modal/ModalMessage';
import {commonActionCreators} from '../../common/actions/common.actions.actionCreators';

import '../../common/css/common.css';
import './Registration.css';

class Registration extends Component{
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

    onSubmitForm(event){
        event.preventDefault();
        this.resetErrorsForm();
        this.props.resetUsernameErrorState();

        const username = event.target.usernameInput.value;
        const password = event.target.passwordInput.value;
        const passwordConfirm = event.target.passwordConfirmInput.value;
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

    hideModalMessage = () => {
        this.props.hideModalMessage();
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
            <Auxiliary>
                <ModalMessage
                    modalType="DANGER"
                    modalMessage={this.props.modalMessageBody}
                    showModalMessage={this.props.showModalMessage}
                    clicked={this.hideModalMessage}
                />

                <div className="background-image">
                    <div className="container">
                        <div className="row">
                            <div className="form-container registration-container col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-10 offset-1">
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
            </Auxiliary>
        );
    }
}

const mapStateToProps = state => {
    return{
        isUsernameUsed: state.registration.isUsernameUsed,
        registrationErrorCode: state.registration.registrationErrorCode,
        generalError: state.registration.generalError,
        showModalMessage: state.common.showModalMessage,
        modalMessageBody: state.common.messageBody
    };
};

const mapDispatchToProps = dispatch => {
    return{
        userRegistration: (username, password) => dispatch(registrationActionCreators.userRegistration(username, password)),
        resetUsernameErrorState: () => dispatch(registrationActionCreators.resetUsernameErrorState()),
        hideModalMessage: () => dispatch(commonActionCreators.hideModalMessage())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);