import React, {Component} from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import {NavLink} from 'react-router-dom';
import Backdrop from '../Backdrop/Backdrop';
import Signature from '../Signature/Signature';

import './Header.css';
import '../../../common/css/common.css';
import Logo from '../../../assets/images/fifa-manager-logo.png';
import userSample from '../../../assets/images/user-sample.png';

// TODO
// - Super admin menu
// - Make more beautiful admin area
// - Align menu icons with others

class Header extends Component{
    state = {
        hideMenuComponent: null
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

    logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }

    render(){
        /* Header component types */
        let headerComponent = 
            <nav className="navbar dark-bg fixed-top navbar-dark">
                <span className="navbar-brand" onClick={this.showMenuComponent}>
                    <i className="fas fa-bars"/>
                </span>

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

        /* User information */
        const username = localStorage.getItem("username");

        let userSection = 
            <NavLink to="/user" onClick={this.hideMenuComponent}>
                <div className="user-section">
                    <div className="d-flex justify-content-center">
                        <img src={userSample} className="rounded-circle user-image" alt="Fifa Manager Logo"/>
                    </div>

                    <div className="d-flex justify-content-center">
                        <span>
                            {username}
                        </span>
                    </div>
                </div>
            </NavLink>

        let superAdminMenu =
            <ul>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-user-lock"/>&nbsp;
                        Pannello admin
                    </NavLink>
                </li>
                <li className="li-footer">
                    <NavLink to="/login" onClick={this.logout}>
                        <i className="fas fa-sign-out-alt"/>&nbsp;
                        Logout
                    </NavLink>

                    <Signature/>
                </li>
            </ul>;

        /* Menu admin types */
        let adminMenu =
            <ul>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-trophy"/>&nbsp;
                        Le mie competizioni
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-search"/>&nbsp;
                        Cerca una competizione
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-gamepad"/>&nbsp;
                        Cerca un player
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-calendar-plus"/>&nbsp;
                        Nuova competizione
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-poll-h"/>&nbsp;
                        Inserisci un risultato
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-user-lock"/>&nbsp;
                        Area admin
                    </NavLink>
                </li>
                <li className="li-footer">
                    <NavLink to="/login" onClick={this.logout}>
                        <i className="fas fa-sign-out-alt"/>&nbsp;
                        Logout
                    </NavLink>

                    <Signature/>
                </li>
            </ul>;

        /* Menu user types */
        let userMenu =
            <ul>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-trophy"/>&nbsp;
                        Le mie competizioni
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-search"/>&nbsp;
                        Cerca una competizione
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/dashboard" onClick={this.hideMenuComponent}>
                        <i className="fas fa-gamepad"/>&nbsp;
                        Cerca un player
                    </NavLink>
                </li>
                <li className="li-footer">
                    <NavLink to="/login" onClick={this.logout}>
                        <i className="fas fa-sign-out-alt"/>&nbsp;
                        Logout
                    </NavLink>

                    <Signature/>
                </li>
            </ul>;

        /* Sidenav menu */
        let sideNavMenu = null;
        let menu = userMenu;

        if(this.props.menuType === 'superAdmin'){
            menu = superAdminMenu;
        }
        else if(this.props.menuType === 'admin'){
            menu = adminMenu;
        }

        if(this.state.hideMenuComponent === false){
            sideNavMenu = 
                <Auxiliary>
                    <Backdrop show={true} backdropStyle="backdropStyle " clicked={this.hideMenuComponent}/>
                    <nav className="dark-bg sideNavMenu sideNavMenuOpened animated slideInLeft faster">
                        {userSection}
                        {menu}
                    </nav>
                </Auxiliary>;
        }
        else if(this.state.hideMenuComponent === true){
            sideNavMenu = 
                <Auxiliary>
                    <nav className="dark-bg sideNavMenu animated slideOutLeft faster sideNavMenuClosed">
                        {userSection}
                        {menu}
                    </nav>
                </Auxiliary>;
        }

        return(
            <Auxiliary>
                {headerComponent}
                {sideNavMenu}
            </Auxiliary>
        );
    }
}

export default Header;