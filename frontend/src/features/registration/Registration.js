import React, {Component} from 'react';
import Header from '../../components/UI/Header/Header';

import '../../common/css/common.css';

class Registration extends Component{

    render(){
        return(

            <div className="background-image">
                <div className="container">
                    <div className="row">
                        <div className="form-container col-lg-10 offset-lg-1">
                            <Header classes="header-form"/>

                            <p>
                                Inserisci i obbligatori campi per registrarti.
                            </p>

                            <form className="register-form">
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

                                <div class="form-group">
                                    <label for="nameInput">Nome:</label>
                                    <input type="text" class="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Nome"/>
                                </div>

                                <div class="form-group">
                                    <label for="surnameInput">Cognome:</label>
                                    <input type="text" class="form-control" id="surnameInput" aria-describedby="surnameHelp" placeholder="Cognome"/>
                                </div>

                                <div class="form-group">
                                    <label for="nameInput">Nome:</label>
                                    <input type="text" class="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Nome"/>
                                </div>

                                <div class="form-group">
                                    <label for="nameInput">Nome:</label>
                                    <input type="text" class="form-control" id="nameInput" aria-describedby="nameHelp" placeholder="Nome"/>
                                </div>


                            
                            
                            
                            </form>

                        </div>
                    </div>
                </div>
            </div>












        );
    }

}

export default Registration;