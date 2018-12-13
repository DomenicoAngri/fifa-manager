import React from 'react';

import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

import './Modal.css';

const modal = (props) => {
    const modalType = props.modalType;
    let modalStyle = 'alert alert-dismissible modal-message '; 

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

    // TODO sono qua e devo vedere come far apparire e scomparire o caaaaaazzz

    return(
        <Auxiliary>
            <Backdrop show="true"/>

            <div className={modalStyle}>
                <button type="button" className="close">&times;</button>
                <strong>TEST ERROR!</strong>
                <p>ATTENZIONE! Qui abbiamo un bel modal test error!</p>
            </div>
        </Auxiliary>
    );
}

export default modal;