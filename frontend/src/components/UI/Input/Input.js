import React from 'react';

import './Input.css';

const Input = (props) => {
    let inputElement = null;

    switch(props.inputType){
        case('input'):
            inputElement = 
                <input
                    className = {[props.inputClasses].join(' ')}
                    value = {props.value}
                    onChange = {props.onChange}
                />;
            break;

        case('textarea'):
            inputElement = 
                <textarea
                    className = {[props.inputClasses].join(' ')}
                    value = {props.value}
                    onChange = {props.onChange}
                />;
            break;

        default:
            inputElement = 
                <input
                    type = "text"
                    className = {[props.inputClasses].join(' ')}
                    value = {props.value}
                    onChange = {props.onChange}
                />;
    }

    return(
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default Input;