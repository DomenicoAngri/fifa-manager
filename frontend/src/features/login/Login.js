import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {loginActionCreators} from './login.actionCreators';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Header from '../../components/UI/Header/Header';
import getMessage from '../../common/utilities/messages';
import Modal from '../../components/UI/Modal/Modal';

import './Login.css';
import '../../common/css/common.css';

class Login extends Component{
    state = {
        username: '',
        password: '',
        usernameInputError: false,
        usernameInputErrorMessage: '',
        passwordInputError: false,
        passwordInputErrorMessage: ''
    };
    
    resetErrorsFrom(){
        const initialErrorsForm = {
            usernameInputError: false,
            usernameInputErrorMessage: '',
            passwordInputError: false,
            passwordInputErrorMessage: ''
        };

        this.setState(initialErrorsForm);
    }

    onSubmitForm(event){
        event.preventDefault();
        this.resetErrorsFrom();
        this.props.resetLoginErrorStates();

        const username = event.target.usernameInput.value;
        const password = event.target.passwordInput.value;
        const whiteSpaceValidation = RegExp('^ *$');
        const usernameValidation = RegExp('^\\w+$');

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
        else{
            this.props.login(username, password);
        }
    }
    
    render(){
        let usernameInvalidFeedback = null;
        let passwordInvalidFeedback = null;

        if(this.state.usernameInputError){
            usernameInvalidFeedback = <div className="invalid-feedback">{this.state.usernameInputErrorMessage}</div>;
        }
        else if(this.props.userNotFound){
            usernameInvalidFeedback = <div className="invalid-feedback">{getMessage(this.props.loginErrorCode)}</div>;
        }

        if(this.state.passwordInputError){
            passwordInvalidFeedback = <div className="invalid-feedback">{this.state.passwordInputErrorMessage}</div>;
        }
        else if(this.props.incorrectUserPassword){
            passwordInvalidFeedback = <div className="invalid-feedback">{getMessage(this.props.loginErrorCode)}</div>;
        }

        return(
            <Auxiliary>
                <Modal modalType="DANGER"/>

                <div className="background-image">
                    <div className="container">
                        <div className="row">
                            <div className="form-container login-container col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-10 offset-1">
                                <Header classes="header-login-form"/>
                                
                                <p>
                                    Benvenuto, se non hai un account, registrati.<br />
                                    Per partecipare al torneo, dovrai essere autorizzato da un amministratore.
                                </p>

                                <form className="login-form" onSubmit={(event) => this.onSubmitForm(event)}>
                                    <div className={"form-group " + (this.state.usernameInputError || this.props.userNotFound ? "has-danger" : "")}>
                                        <label htmlFor="usernameInput">Inserisci il tuo username:</label>
                                        <input
                                            type="text"
                                            className={"form-control " + (this.state.usernameInputError || this.props.userNotFound ? "is-invalid" : "")}
                                            id="usernameInput"
                                            aria-describedby="usernameHelp"
                                            placeholder="Username"
                                        />
                                        {usernameInvalidFeedback}
                                    </div>
                                    
                                    <div className={"form-group " + (this.state.passwordInputError || this.props.incorrectUserPassword ? "has-danger" : "")}>
                                        <label htmlFor="passwordInput">Password:</label>
                                        <input
                                            type="password"
                                            className={"form-control " + (this.state.passwordInputError || this.props.incorrectUserPassword ? "is-invalid" : "")}
                                            id="passwordInput"
                                            placeholder="Password"
                                        />
                                        {passwordInvalidFeedback}
                                    </div>

                                    <button className="btn btn-primary button-login-form">Login</button>
                                    <NavLink to="/registration">
                                        <input type="button" value="Registrati" className="btn btn-primary button-login-form"/>
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
        userNotFound: state.login.userNotFound,
        incorrectUserPassword: state.login.incorrectUserPassword,
        modalMessage: state.login.modalMessage,
        loginErrorCode: state.login.loginErrorCode
    };
};

const mapDispatchToProps = dispatch => {
    return{
        login: (username, password) => dispatch(loginActionCreators.login(username, password)),
        resetLoginErrorStates: () => dispatch(loginActionCreators.resetLoginErrorStates())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);