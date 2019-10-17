import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import Registration from './features/registration/Registration';
import Dashboard from './features/dashboard/Dashboard';
import User from './features/user/User';
import Header from './components/UI/Header/Header';
import {startActionCreators} from './features/start/start.actionCreators';

import './common/css/common.css';

// import Test from './features/test/Test';

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
// - Trimmare username al login.

class App extends Component{
    render(){
        let routes = null;
        let body = null;
        let menuType = null;

        this.props.checkLoginStatus();

        if(this.props.isUserAuthenticated){
            if(this.props.isSuperAdmin){
                routes = (
                    <Switch>
                        <Route path="/super-admin" component={Dashboard}/>
                        <Redirect to="/super-admin"/>
                    </Switch>
                );

                // Select menu type
                menuType = 'superAdmin';
            }
            else if(this.props.isAdmin){
                routes = (
                    <Switch>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/user" component={User}/>
                        <Route path="/my-leagues" component={User}/>
                        <Route path="/search-leagues" component={User}/>
                        <Route path="/search-users" component={User}/>
                        <Route path="/create-league" component={User}/>
                        <Route path="/insert-results" component={User}/>
                        <Route path="/make-admin" component={User}/>
                        <Redirect to="/dashboard"/>
                    </Switch>
                );

                // Select menu type
                menuType = 'admin';
            }
            else{
                routes = (
                    <Switch>
                        <Route path="/dashboard" component={Dashboard}/>
                        <Route path="/user" component={User}/>
                        <Route path="/my-leagues" component={User}/>
                        <Route path="/search-leagues" component={User}/>
                        <Route path="/search-users" component={User}/>
                        <Redirect to="/dashboard"/>
                    </Switch>
                );

                // Select menu type
                menuType = 'user';
            }
            
            body =
                <Fragment>
                    <Header menuType={menuType}/>
                    {routes}
                </Fragment>;
        }
        else{
            routes = (
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Redirect to="/login"/>
                </Switch>
            );

            body = routes;
        }
        
        return(
            <div className="container-fluid background-image">
                {body}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isUserAuthenticated: state.start.isUserAuthenticated,
        isSuperAdmin: state.start.isSuperAdmin,
        isAdmin: state.start.isAdmin
    };
};

const mapDispatchToProps = dispatch => {
    return{
        checkLoginStatus: () => dispatch(startActionCreators.checkLoginStatus())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));