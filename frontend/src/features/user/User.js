import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Header from '../../components/UI/Header/Header';
import {Doughnut} from 'react-chartjs-2';

import './User.css';
import '../../common/css/common.css';

import userSample from '../../assets/images/user-sample.png';

class User extends Component{







    render(){
        /* User information */
        const username = localStorage.getItem("username");

        const matchesData = {labels:['Vittorie','Pareggi','Sconfitte'],datasets:[{data:[10,3,6],backgroundColor:['#31be51','#FFCE56','#e43546'],hoverBackgroundColor:['#31be51','#FFCE56','#e43546']}]};
        const goalData = {labels:['Gol fatti','Gol subiti'],datasets:[{data:[130,45],backgroundColor:['#17a2b8','#fd7e14'],hoverBackgroundColor:['#17a2b8','#fd7e14']}]};

        const pieChartlegend = {
            display: true,
            position: 'right'
        };

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
                                    <h4>
                                        {username}&nbsp;
                                        <NavLink to="/editUser">
                                            <i class="far fa-edit"/>
                                        </NavLink>
                                    </h4>
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
                            <div className="card-header">
                                <h4>Statistiche di Domenico</h4>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i class="far fa-futbol"/>&nbsp;Squadra</small>
                                        <NavLink to="/userClub">
                                            <p>JUVENTUS FOOTBALL CLUB</p>
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text">Partite totali</small>
                                        <p>125</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <Doughnut data={matchesData} legend={pieChartlegend}/>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text">Media gol fatti</small>
                                        <p>2,34</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text">Media gol subiti</small>
                                        <p>0,37</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <Doughnut data={goalData} legend={pieChartlegend}/>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text"><i class="fas fa-clipboard-list"/>&nbsp;Partecipazioni</small>
                                        <p>20</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text"><i class="fas fa-trophy"/>&nbsp;Trofei vinti</small>
                                        <p>2</p>
                                    </div>
                                </div>
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
        name: state.user.name,
        surname: state.user.surname,
        age: state.user.age,
        nationality: state.user.nationality,
        city: state.user.city,
        email: state.user.email,
        telephone: state.user.telephone,
        teamName: state.user.teamName,
        totalMatches: state.user.totalMatches,
        wonMatches: state.user.wonMatches,
        drawMatches: state.user.drawMatches,
        lossesMatch: state.user.lossesMatch,
        scoredGoals: state.user.scoredGoals,
        concededGoals: state.user.concededGoals,
        createdDate: state.user.createdDate,
        totalTournaments: state.user.totalTournaments,
        wonTrophies: state.user.wonTrophies
    };
};

const mapDispatchToProps = dispatch => {
    return{
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);