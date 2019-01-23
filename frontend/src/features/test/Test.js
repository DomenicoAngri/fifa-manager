import React, {Component} from 'react';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import ModalMessage from '../../components/UI/Modal/ModalMessage';

class Test extends Component{
    render(){
        return(
            <Auxiliary>
                {/* <ModalMessage
                    modalType="DANGER"
                    modalMessage={"TEST STESTETSTE"}
                    showModalMessage={true}
                /> */}

                <Spinner showSpinner={true}/>
            </Auxiliary>
        );
    }
}

export default Test;