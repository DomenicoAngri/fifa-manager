import React, {Component} from 'react';
import {connect} from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Header from '../../components/UI/Header/Header';

import './User.css';
import '../../common/css/common.css';

import userSample from '../../assets/images/user-sample.png';

class User extends Component{







    render(){
        /* User information */
        const username = localStorage.getItem("username");

        return(
            <Auxiliary>
                <Header/>


<div className="container">



                <div className="main-container">
                    <div className="row">
                        <div className="card bibi col-12">

                            <div className="card-body">
                            
                            <div className="d-flex justify-content-center">
                                <img src={userSample} className="rounded-circle user-image" alt="Fifa Manager Logo"/>
                            </div>

                            <div className="d-flex justify-content-center">
                                <span>
                                    {username}
                                </span>
                            </div>
                            
                            </div>

                            





                        </div>
                    </div>

                    <div className="row">
                        <div className="user-profile col-12">
                                test2
                        </div>
                    </div>
                </div>



</div>
            </Auxiliary>
        );
    }














}

const mapStateToProps = state => {
    return{
    };
};

const mapDispatchToProps = dispatch => {
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);