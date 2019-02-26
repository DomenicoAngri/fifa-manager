import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    return(
        props.show ? <div className={props.backdropStyle + "backdrop animated fadeIn faster"} onClick={props.clicked}/> : <div className={props.backdropStyle + "backdrop animated fadeOut faster"}/>
    );
}

export default backdrop;