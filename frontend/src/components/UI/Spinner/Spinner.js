import React from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

import './Spinner.css';

const Spinner = (props) => {
    const baseStyle = "spinner animated faster ";
    let style = baseStyle + "fadeOut spinner-disappear";

    if(props.showSpinner){
        style = baseStyle + "fadeIn spinner-appear";
    }

    return(
        <Auxiliary>
            <Backdrop show={props.showSpinner}/>
            <div className={style}/>
        </Auxiliary>
    );

}

export default Spinner;