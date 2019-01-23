import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import {loginActionCreators} from './features/login/login.actionCreators';
import Registration from './features/registration/Registration';
import Dashboard from './features/dashboard/Dashboard';

import Test from './features/test/Test';

import './common/css/common.css';

class App extends Component{
    componentDidMount(){
        this.props.checkLoginStatus();
    }

    render(){
        let routes = (
            <Switch>
                <Route path="/test" component={Test}/>
                <Route path="/login" component={Login}/>
                <Route path="/registration" component={Registration}/>
                <Redirect to="/login"/>
            </Switch>
        );
        
        if(this.props.isUserAuthenticated){
            routes = (
                <Switch>
                    <Route path="/test" component={Test}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Redirect to="/login"/>
                </Switch>
            );
        }

        return(
            <div className="background-image">
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