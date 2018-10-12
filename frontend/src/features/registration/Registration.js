import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Header from '../../components/UI/Header/Header';

import '../../common/css/common.css';
import './Registration.css';

class Registration extends Component{
    render(){
        return(
            <div className="background-image">
                <div className="container">
                    <div className="row">
                        <div className="form-container registration-container col-xl-4 offset-xl-4 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-10 offset-1">
                            <Header classes="header-registration-form"/>

                            <p>
                                Per registrarti, inserisci semplicemente un username ed una password.
                            </p>

                            <form className="registration-form">
                                <div class="form-group">
                                    <label for="usernameInput">Username:</label>
                                    <input type="text" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Username"/>
                                </div>

                                <div class="form-group">
                                    <label for="passwordInput">Password:</label>
                                    <input type="password" class="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="Password"/>
                                </div>

                                <div class="form-group">
                                    <label for="passwordConfirmInput">Conferma password:</label>
                                    <input type="password" class="form-control" id="passwordConfirmInput" aria-describedby="passwordConfirmHelp" placeholder="Password"/>
                                </div>

                                <input type="button" value="Registrati" className="btn btn-primary button-registration-form"/>
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

export default Registration;