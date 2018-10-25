import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import Registration from './features/registration/Registration';
import Dashboard from './features/dashboard/Dashboard';

class App extends Component{
    render(){
        let routes = (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Redirect to="/login"/>
            </Switch>
        );

        if(this.props.isUserAuthenticated){
            routes = (
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Redirect to="/login"/>
                </Switch>
            );
        }

        return(
            <div>
                {routes}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        isUserAuthenticated: state.login.token !== null
    };
};

export default connect(mapStateToProps, null)(App);