import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
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

                <div className="container card-app-height">
                    <div className="row">
                        <div className="card profile-card-bg col-12">
                            <div className="card-body">
                                <div className="d-flex justify-content-center">
                                    <img src={userSample} className="rounded-circle user-image" alt="Fifa Manager Logo"/>
                                </div>

                                <div className="d-flex justify-content-center">
                                    {username}&nbsp;
                                    <NavLink to="/editUser">
                                        <i class="far fa-edit"/>
                                    </NavLink>
                                </div>

                                <hr className="hr-style-bg"/>
                                
                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text"><i class="fas fa-male"/>&nbsp;Nome</small>
                                        <p>Domenico Angri</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text"><i class="fas fa-birthday-cake"/>&nbsp;Età</small>
                                        <p>29</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text"><i class="fas fa-globe-americas"/>&nbsp;Nazionalità</small>
                                        <p>Italiana</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text"><i class="fas fa-map-marker-alt"/>&nbsp;From</small>
                                        <p>Milano</p>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i class="fas fa-envelope"/>&nbsp;Mail</small>
                                        <p>domenico.angri@gmail.com</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i class="fas fa-mobile-alt"/>&nbsp;Telefono</small>
                                        <p>3273114756</p>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i class="fas fa-calendar-alt"/>&nbsp;Joined</small>
                                        <p>05/07/2016</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="card profile-card-bg col-12">
                            <div className="card-header">Statistiche</div>
                            <div className="card-body">
                                
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