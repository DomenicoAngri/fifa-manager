import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from './features/login/Login';

class App extends Component{

    render(){
        return(
            <div>
                <Switch>
                    <Route path="/login" component={Login}/>
                    {/* <Route path="/dashboard" component={Dashboard}/> */}
                    <Redirect to="/login"/>
                </Switch>
            </div>
        );
    }

}

export default App;