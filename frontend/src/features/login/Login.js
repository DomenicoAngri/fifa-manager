import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Header from '../../components/UI/Header/Header';

import './Login.css';
import '../../common/css/common.css';

class LoginPage extends Component{
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

                            <form className="login-form">
                                <div className="form-group">
                                    <label htmlFor="usernameInput">Inserisci il tuo username:</label>
                                    <input type="email" className="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Username"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="passwordInput">Password:</label>
                                    <input type="password" className="form-control" id="passwordInput" placeholder="Password"/>
                                </div>
                                <input type="button" value="Login" className="btn btn-primary button-login-form"/>
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

export default LoginPage;