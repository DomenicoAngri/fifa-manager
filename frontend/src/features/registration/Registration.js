import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../../components/UI/Header/Header';
import {registrationActions} from '../../store/actions/registration.actions';

import '../../common/css/common.css';
import './Registration.css';

class Registration extends Component{
    state = {
        username: '',
        password: '',
        submitted: false,
        error: false
    };

    checkUsernameExists(event){
        event.preventDefault();

        this.setState({
            ...this.state,
            username: event.target.value
        });

        this.props.checkUsernameExists(event.target.value);
    }

    render(){



        {
            /*

            <div class="form-group has-success">
  <label class="form-control-label" for="inputSuccess1">Valid input</label>
  <input type="text" value="correct value" class="form-control is-valid" id="inputValid">
  <div class="valid-feedback">Success! You've done it.</div>
</div>

<div class="form-group has-danger">
  <label class="form-control-label" for="inputDanger1">Invalid input</label>
  <input type="text" value="wrong value" class="form-control is-invalid" id="inputInvalid">
  <div class="invalid-feedback">Sorry, that username's taken. Try another?</div>
</div>
            
            
            */
        }
        




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
                                <div className="form-group">
                                    <label htmlFor="usernameInput">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="usernameInput"
                                        aria-describedby="usernameHelp"
                                        placeholder="Username"
                                        onChange={(event) => this.checkUsernameExists(event)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="passwordInput">Password:</label>
                                    <input type="password" className="form-control" id="passwordInput" aria-describedby="passwordHelp" placeholder="Password"/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="passwordConfirmInput">Conferma password:</label>
                                    <input type="password" className="form-control" id="passwordConfirmInput" aria-describedby="passwordConfirmHelp" placeholder="Password"/>
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
        registering: state.registering
    };
};

const mapDispatchToProps = dispatch => {
    return{
        checkUsernameExists: (username) => dispatch(registrationActions.checkUserExists(username))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);