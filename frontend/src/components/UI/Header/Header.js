import React from 'react';

import './Header.css';
import Logo from '../../../assets/images/fifa-manager-logo.png';

const header = (props) => {
    return(
        <header className={props.classes}>
            <img src={Logo} className="header-logo" alt="Fifa Manager Logo"/>
            <h1 className="header-title">Fifa Manager</h1>
        </header>
    );
}

export default header;