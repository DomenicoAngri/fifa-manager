import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import Registration from './features/registration/Registration';
import Dashboard from './features/dashboard/Dashboard';
import User from './features/user/User';
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
        const token = localStorage.getItem('token');
        let routes = null;

        /* 
            We must check first if there is token stored in local storage, for to render the correct routes.

            We must do this first, because if we will check login status before to render the routes, the user will display first the login page,
            because the first initial state of auth, is: user is not authenticated. And after the user will display the login page, React will check
            the login status, and will redirect to the correct page (login if token are not valid, otherwise in dashboard).
            This behavior is not good, because the first entry point of application must have the correct routes, and in this case, the first route,
            would always have been login page. In particular, if user have a slow network, with this behavior, it will see always first the login page, and after the correct,
            and another problem is: if user want call a particular page from the URL, can't do it after the check login status, because the first render of routes,
            would always have been login page.

            If token isn't stored, we will redirect user on the login (or registration) page.
            If token is store, we can call the check login status function, for to check if user's token is valid.
            If token is valid, the user will be redirect on the dashboard page, otherwise, it will be redirect on the login page.
        */
        if(token){
            this.props.checkLoginStatus();

            if(this.props.isUserAuthenticated){
                if(this.props.isSuperAdmin){
                    // TODO - Super admin section
                    routes = (
                        <Switch>
                            <Route path="/super-admin" component={Dashboard}/>
                            <Redirect to="/super-admin"/>
                        </Switch>
                    );
                }
                else if(this.props.isAdmin){
                    // TODO - Admin section
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
                }
            }
        }
        else{
            routes = (
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
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