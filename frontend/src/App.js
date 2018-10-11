import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './features/login/Login';
import Registration from './features/registration/Registration';

class App extends Component{

    render(){
        return(
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/registration" component={Registration}/>
                    <Redirect to="/login"/>
                </Switch>
            </div>
        );
    }

}

export default App;