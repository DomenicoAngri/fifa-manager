import React from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import './Header.css';
import '../../../common/css/common.css';
import Logo from '../../../assets/images/fifa-manager-logo.png';

const header = (props) => {
    let headerComponent = 
        <nav className="navbar dark-bg fixed-top navbar-dark">
            <a class="navbar-brand" href="#">
                <i class="fas fa-bars"></i>            
            </a>

            <a class="navbar-brand my-2 my-lg-0" href="#">
                Fifa Manager&nbsp;
                <img src={Logo} className="navbar-logo" alt="Fifa Manager Logo"/>                
            </a>
        </nav>;

    if(props.headerType === 'loginHeader'){
        headerComponent = 
            <header className={props.classes}>
                <img src={Logo} className="header-logo" alt="Fifa Manager Logo"/>
            </header>;
    }

    return(
        <Auxiliary>
            {headerComponent}
        </Auxiliary>
    );
}

export default header;