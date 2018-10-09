import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import './Login.css';
import Logo from '../../assets/images/fifa-manager-logo.png';

class LoginPage extends Component{

    render(){
        return(
            <div className="login">

                <div className="login-form">

                    <header className="header-form">
                        <img src={Logo} className="login-logo" alt="Fifa Manager Logo"/>
                        <h1 className="login-title">Fifa Manager</h1>
                        <p>
                            Benvenuto, se non hai un account, registrati.<br />
                            Per partecipare al torneo, dovrai essere autorizzato da un amministratore.
                        </p>
                    </header>
                    
                    <input type="text"/>
                    <input type="password"/>
                    <input type="button" value="Login"/>
                    <input type="button" value="Registrati"/>
                </div>



























                {/* <div className="container">
                    <div className="row">
                        <div className="col-12 login-form">
                            <img src={Logo} className="login-logo" alt="Fifa Manager Logo"/>
                            <h1 className="login-title">Fifa Manager</h1>
                            <p>
                                Benvenuto, se non hai un account, registrati.<br />
                                Per partecipare al torneo, dovrai essere autorizzato da un amministratore.
                            </p>
                            <input type="text"/>
                            <input type="password"/>
                        </div>
                    </div>
                </div> */}

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