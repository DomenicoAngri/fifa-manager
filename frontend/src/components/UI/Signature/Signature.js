import React, {Fragment} from 'react';
import {commonConstants} from '../../../common/utilities/constants';

import './Signature.css';

const Signature = () => {
    return(
        <Fragment>
            <p className="signature">
                {commonConstants.FE_APP_VERSION}
            </p>
            <p className="signature">
                Developed with <i className="fas fa-heart"/> By Domenico Angri
            </p>
        </Fragment>
    );
}

export default Signature;