import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';

import Header from '../../components/UI/Header/Header';
import {registrationActions} from '../../store/actions/registration.actions';

import '../../common/css/common.css';
import './Registration.css';
import { throws } from 'assert';

class Registration extends Component{
    state = {
        username: '',
        password: '',
        submitted: false,
        error: false,
        confirmedPassword: false
    };

    checkUsernameExists(event){
        event.preventDefault();
        const usernameInserted = event.target.value;
        console.log(usernameInserted);
        this.props.checkUsernameExists(usernameInserted);
    }
    
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
                                <div className={"form-group " + (this.props.isUsernameUsed ? "has-danger" : "")}>
                                    <label htmlFor="usernameInput">Username:</label>
                                    <input
                                        type="text"
                                        className={"form-control " + (this.props.isUsernameUsed ? "is-invalid" : "")}
                                        id="usernameInput"
                                        aria-describedby="usernameHelp"
                                        placeholder="Username"
                                        onChange={(event) => this.checkUsernameExists(event)}
                                    />
                                    <div className="invalid-feedback">Questo username è gia utilizzato!</div>
                                </div>

                                <div className={"form-group " + (this.state.confirmedPassword ? "has-danger" : "")}>
                                    <label htmlFor="passwordInput">Password:</label>
                                    <input
                                        type="password"
                                        className={"form-control " + (this.state.confirmedPassword ? "is-invalid" : "")}
                                        id="passwordInput"
                                        aria-describedby="passwordHelp"
                                        placeholder="Password"
                                    />
                                </div>

                                <div className={"form-group " + (this.state.confirmedPassword ? "has-danger" : "")}>
                                    <label htmlFor="passwordConfirmInput">Conferma password:</label>
                                    <input
                                        type="password"
                                        className={"form-control " + (this.state.confirmedPassword ? "is-invalid" : "")}
                                        id="passwordConfirmInput"
                                        aria-describedby="passwordConfirmHelp"
                                        placeholder="Password"
                                    />
                                    <div className="invalid-feedback">Le due password non sono uguali!</div>
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

const mapStateToProps = state => {
    return{
        isUsernameUsed: state.registration.isUsernameUsed
    };
};

const mapDispatchToProps = dispatch => {
    return{
        checkUsernameExists: (username) => dispatch(registrationActions.checkUserExists(username))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);