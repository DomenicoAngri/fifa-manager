import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import {loginActionCreators} from './features/login/login.actionCreators';
import Registration from './features/registration/Registration';
import Dashboard from './features/dashboard/Dashboard';
import User from './features/user/User';

// import Test from './features/test/Test';

import './common/css/common.css';

// TODO:
// - Problem on spinner when do animation with bar on the side.
// - Reset all problem status on login and other form after new tentative.
// - Vedere quando si apre il menù il fatto che scorrono i contenuti sotto.
// - Proprietà fixed quando si apre menu e scorre ancora la roba sotto.
// - Controllare lo spinner se c'è dappertutto.
// - Risolvere bug dello smooting in iphone.
// - Su ogni pagina, dopo ripristinarne lo stato. Ad esempio se nella schermata di login c'è stato un errore e poi la persona si logga correttamente, ripristinare la maschera, non lasciare errore memorizzato, che se in futuro si dovesse tornare a quella schermata, resta con l'errore creando inconsistenza.
// - Al login, inserire il tasto di visualizzazione della password.
// - Al login, se password sbagliata inserire X, oppure cancellarla in automatico.

// TODOORA: devo inserire lo stato is super admin al posto giusto, devo farlo diventare più breve dalla risposta perchè ora è troppo lungo, e quindi devo capire chi restituisce il payload e vedre se farlo senza token.

class App extends Component{
    componentDidMount(){
        this.props.checkLoginStatus();
    }

    render(){
        let routes = (
            <Switch>
                {/* <Route path="/test" component={Test}/> */}
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Redirect to="/login"/>
            </Switch>
        );
        
        if(this.props.isUserAuthenticated){
            routes = (
                <Switch>
                    {/* <Route path="/test" component={Test}/> */}
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/user" component={User}/>
                    <Redirect to="/login"/>
                </Switch>
            );
        }

        return(
            <div className="container-fluid background-image">
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isUserAuthenticated: state.login.isUserAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return{
        checkLoginStatus: () => dispatch(loginActionCreators.checkLoginStatus())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));