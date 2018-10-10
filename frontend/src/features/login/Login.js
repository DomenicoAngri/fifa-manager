import React, {Component} from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

import './Login.css';
import Logo from '../../assets/images/fifa-manager-logo.png';

class LoginPage extends Component{

    render(){
        return(
            <div className="login">

                <div className="container">
                    <div className="row">
                        <div className="login-container col-xl-6 offset-xl-3 col-lg-8 offset-lg-2 col-md-8 offset-md-2 col-sm-10 offset-sm-1 col-10 offset-1">
                            <header className="header-form">
                                <img src={Logo} className="login-logo" alt="Fifa Manager Logo"/>
                                <h1 className="login-title">Fifa Manager</h1>
                            </header>
                            
                            <p>
                                Benvenuto, se non hai un account, registrati.<br />
                                Per partecipare al torneo, dovrai essere autorizzato da un amministratore.
                            </p>

                            <form className="login-form">
                                <div className="form-group">
                                    <label for="usernameInput">Inserisci il tuo username:</label>
                                    <input type="email" class="form-control" id="usernameInput" aria-describedby="usernameHelp" placeholder="Username"/>
                                </div>
                                <div class="form-group">
                                    <label for="passwordInput">Password:</label>
                                    <input type="password" class="form-control" id="passwordInput" placeholder="Password"/>
                                </div>
                                <input type="button" value="Login" className="btn btn-primary button-form"/>
                                <input type="button" value="Registrati" className="btn btn-primary button-form"/>
                            </form>
                        </div>
                    </div>
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