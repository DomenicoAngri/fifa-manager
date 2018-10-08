import React from 'react';

import css from './Button.css';

const Button = (props) => (
    <button
        disabled={props.disabled}
        className={[props.buttonStyle, props.buttonCSS].join(' ')}
        onClick={props.onClick}
    >
        {props.children}
    </button>
);

export default Button;