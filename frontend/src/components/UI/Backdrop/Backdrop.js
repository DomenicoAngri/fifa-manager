import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    return(
        props.show ? <div className="backdrop animated fadeIn faster backdrop-appear" onClick={props.clicked}/> : <div className="backdrop animated fadeOut faster backdrop-disappear"/>
    );
}

export default backdrop;