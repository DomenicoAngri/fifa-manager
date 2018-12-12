import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import {loginActionCreators} from './features/login/login.actionCreators';
import Registration from './features/registration/Registration';
import Dashboard from './features/dashboard/Dashboard';

class App extends Component{
    componentDidMount(){
        const token = localStorage.getItem('token');
        this.props.checkLoginStatus(token);
    }

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
        isUserAuthenticated: false
    };
};

const mapDispatchToProps = dispatch => {
    return{
        checkLoginStatus: (token) => dispatch(loginActionCreators.checkLoginStatus(token))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));