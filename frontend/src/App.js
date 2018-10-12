import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import Registration from './features/registration/Registration';
import Dashboard from './features/dashboard/Dashboard';

class App extends Component{
    render(){
        return(
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
        );
    }
}

export default App;