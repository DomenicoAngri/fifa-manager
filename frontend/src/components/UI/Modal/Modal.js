import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

const modal = (props) => {
    const modalType = props.modalType;
    let modalStyle = 'col-xl-6 offset-xl-3 col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-6 offset-sm-3 col-8 offset-2 alert alert-dismissible modal-message '; 

    switch(modalType.toLowerCase()){
        case 'danger':
        modalStyle += 'alert-danger';
            break;
        
        case 'warning':
            modalStyle += 'alert-warning';
            break;
        
        case 'success':
            modalStyle += 'alert-success';
            break;
        
        default:
            modalStyle += 'alert-primary';
            break;
    }

    // TODO sono qua e devo modificare la grafica
    return(
        <Auxiliary>
            <Backdrop show="true"/>

            <div className={modalStyle}>
                <button type="button" className="close">&times;</button>
                <strong>{props.modalMessage}</strong>
            </div>
        </Auxiliary>
    );
}

export default modal;