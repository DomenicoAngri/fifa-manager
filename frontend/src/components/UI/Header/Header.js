import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import {NavLink} from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';

import './Header.css';
import '../../../common/css/common.css';
import Logo from '../../../assets/images/fifa-manager-logo.png';

class Header extends Component{
    state = {
        hideMenuComponent: true
    };

    showMenuComponent = () => {
        this.setState({
            hideMenuComponent: false
        });
    }

    hideMenuComponent = () => {
        this.setState({
            hideMenuComponent: true
        });
    }

    

    render(){

        let headerComponent = 
            <nav className="navbar dark-bg fixed-top navbar-dark">
                <a className="navbar-brand" onClick={this.showMenuComponent}>
                    <i className="fas fa-bars"/>
                </a>

                <NavLink to="/dashboard" className="navbar-brand my-2 my-lg-0">
                    Fifa Manager&nbsp;
                    <img src={Logo} className="navbar-logo" alt="Fifa Manager Logo"/>  
                </NavLink>
            </nav>;

        if(this.props.headerType === 'loginHeader'){
            headerComponent = 
                <header className={this.props.classes}>
                    <img src={Logo} className="header-logo" alt="Fifa Manager Logo"/>
                </header>;
        }

        /* ***************************** */

        let userMenuComponent = null;

        if(!this.state.hideMenuComponent){
            userMenuComponent = 
                <Auxiliary>
                    <Backdrop show={true} clicked={this.hideMenuComponent}/>

                    <nav className="dark-bg sideNavMenu animated slideInLeft faster">
                        <ul>
                            <li>
                                <NavLink to="/dashboard">
                                    Test1
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard">
                                    Test2
                                </NavLink>
                            </li>
                            
                            <li>
                                <NavLink to="/dashboard">
                                    Test3
                                </NavLink>
                            </li>

                            <li>
                                <NavLink to="/dashboard">
                                    Test4
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </Auxiliary>
                
        }
            







        


        return(
            <Auxiliary>
                {headerComponent}
                {userMenuComponent}
            </Auxiliary>
        );

    }

}

export default Header;