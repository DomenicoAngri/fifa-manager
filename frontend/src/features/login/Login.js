import React, {Component} from 'react';
import Logo from '../../assets/images/fifa-manager-logo.png';
import Button from '../../components/UI/Button/Button';

import css from './Login.css';

class LoginPage extends Component{

    render(){
        return(
            <div className="Login">
                <div className="Login-form">
                    <form></form>


                </div>

                {/* <header className="Login-header">
                    <img src={Logo} className="Login-logo" alt="Fifa Manager Logo"/>
                    <h1 className="">Fifa Manager</h1>
                </header>
                <p>
                    Benvenuto, se non hai un account, registrati.<br/>
                    Per partecipare al torneo, dovrai essere autorizzato da un amministratore.
                </p>
                <Button
                    buttonStyle="btn btn-primary"
                    buttonCSS="prova prova2"
                >
                    Login
                </Button> */}



            </div>
        );
    }

}

export default LoginPage;