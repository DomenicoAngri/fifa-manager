import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Header from '../../components/UI/Header/Header';

import './Login.css';
import '../../common/css/common.css';
import { loginActionCreators } from './login.actionCreators';

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
        return(
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
                                <div className={"form-group " + (this.state.usernameInputError ? "has-danger" : "")}>
                                    <label htmlFor="usernameInput">Inserisci il tuo username:</label>
                                    <input
                                        type="text"
                                        className={"form-control " + this.state.usernameInputError ? "is-invalid" : ""}
                                        id="usernameInput"
                                        aria-describedby="usernameHelp"
                                        placeholder="Username"
                                    />
                                    <div className="invalid-feedback">{this.state.usernameInputErrorMessage}</div>
                                </div>
                                <div className={"form-group " + (this.state.passwordInputError ? "has-danger" : "")}>
                                    <label htmlFor="passwordInput">Password:</label>
                                    <input
                                        type="password"
                                        className={"form-control " + this.state.passwordInputError ? "is-invalid" : ""}
                                        id="passwordInput"
                                        placeholder="Password"
                                    />
                                    <div className="invalid-feedback">{this.state.passwordInputErrorMessage}</div>
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
        );
    }
}

const mapStateToProps = state => {
    return{
        isUserAuthenticated: state.login.token !== null
    };
};

const mapDispatchToProps = dispatch => {
    return{
        login: (username, password) => dispatch(loginActionCreators.login(username, password))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);