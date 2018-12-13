import React from 'react';

import './Backdrop.css';

const backdrop = (props) => {
    return(
        props.show ? <div className="backdrop"/> : null
    );
}

export default backdrop;