import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {Doughnut} from 'react-chartjs-2';
import {userActionCreators} from './user.actionCreators';
import moment from 'moment';
import 'moment/locale/it';

import './User.css';
import '../../common/css/common.css';

import userSample from '../../assets/images/user-sample.png';

// TODO:
// - Aggiungere ombra su foto del profilo
// - Distaccare nome da foto del profilo
// - Capire se quando linea lenta ed info ancora non caricate, se mettere qualcosa di attesa.
// - Cambiare i gol subiti da NaN a 0
// - La media gol viene infinito, capire perchè
// - Aggiungere tutte le informazioni mancanti sull'utente a BE

class User extends Component{
    componentWillMount(){
        moment().locale('it');

        const username = localStorage.getItem("username");
        const token = localStorage.getItem("token");

        this.props.getUser(username, token);
    }

    checkStringEmptyOrNull = (stringField) => {
        if(stringField){
            return stringField;
        }
        else{
            return 'N/A';
        }
    }
    
    render(){
        /* User information */
        const username = localStorage.getItem("username");
        const totalGoals = this.props.scoredGoals + this.props.concededGoals;
        const age = moment().diff(this.props.dateOfBirth, 'years');

        const matchesData = {
            labels: [
                'Vittorie: ' + this.props.wonMatches,
                'Pareggi: ' + this.props.drawMatches,
                'Sconfitte: ' + this.props.lossesMatches
            ],
            datasets: [{
                data: [
                    this.props.wonMatches,
                    this.props.drawMatches,
                    this.props.lossesMatches
                ],
                backgroundColor: ['#31be51','#FFCE56','#e43546'],
                hoverBackgroundColor:['#31be51','#FFCE56','#e43546']
            }]
        };

        const matchesOptions = {
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        return ` ${(data.datasets[0].data[tooltipItem.index] / this.props.totalMatches * 100).toFixed(1)}%`;
                    }
                }
            }
        };

        const goalsData = {
            labels: [
                'Gol fatti: ' + this.props.scoredGoals,
                'Gol subiti: ' + this.props.concededGoals
            ],
            datasets: [{
                data: [
                    this.props.scoredGoals,
                    this.props.concededGoals
                ],
                backgroundColor: ['#17a2b8','#fd7e14'],
                hoverBackgroundColor:['#17a2b8','#fd7e14']
            }]
        };

        const goalsOptions = {
            tooltips: {
                callbacks: {
                    label: (tooltipItem, data) => {
                        return ` ${(data.datasets[0].data[tooltipItem.index] / totalGoals * 100).toFixed(1)}%`;
                    }
                }
            }
        };

        const pieChartlegend = {
            display: true,
            position: 'right'
        };

        return(
            <Auxiliary>
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
                                            <i className="far fa-edit"/>
                                        </NavLink>
                                    </h4>
                                </div>

                                <hr className="hr-style-bg"/>
                                
                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-male"/>&nbsp;Nome</small>
                                        <p>{this.props.name && this.props.surname ? this.props.name + ' ' + this.props.surname : 'N/A'}</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-birthday-cake"/>&nbsp;Età</small>
                                        <p>{this.checkStringEmptyOrNull(age)}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-globe-americas"/>&nbsp;Nazionalità</small>
                                        <p>{this.checkStringEmptyOrNull(this.props.nationality)}</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-map-marker-alt"/>&nbsp;From</small>
                                        <p>{this.checkStringEmptyOrNull(this.props.city)}</p>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i className="fas fa-envelope"/>&nbsp;eMail</small>
                                        <p>{this.checkStringEmptyOrNull(this.props.email)}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i className="fas fa-mobile-alt"/>&nbsp;Telefono</small>
                                        <p>{this.checkStringEmptyOrNull(this.props.telephoneNumber)}</p>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i className="fas fa-calendar-alt"/>&nbsp;Joined</small>
                                        <p>{moment(this.props.createdDate).format('LL')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="card profile-card-bg col-12">
                            <div className="card-header">
                                <h4>Statistiche di {this.props.name ? this.props.name : username}</h4>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i className="far fa-futbol"/>&nbsp;Squadra</small>
                                        <NavLink to="/userClub">
                                            <p>{this.props.teamName ? this.props.teamName : 'Team non ancora assegnato!'}</p>
                                        </NavLink>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text">Partite totali</small>
                                        <p>{this.props.totalMatches}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <Doughnut data={matchesData} options={matchesOptions} legend={pieChartlegend}/>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text">Media gol fatti</small>
                                        <p>{(this.props.scoredGoals / this.props.totalMatches).toFixed(2)}</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text">Media gol subiti</small>
                                        <p>{(this.props.concededGoals / this.props.totalMatches).toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <Doughnut data={goalsData} options={goalsOptions} legend={pieChartlegend}/>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-clipboard-list"/>&nbsp;Partecipazioni</small>
                                        <p>{this.props.totalTournaments}</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-trophy"/>&nbsp;Trofei vinti</small>
                                        <p>{this.props.wonTrophies}</p>
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
        dateOfBirth: state.user.dateOfBirth,
        nationality: state.user.nationality,
        city: state.user.city,
        email: state.user.email,
        telephoneNumber: state.user.telephoneNumber,
        teamName: state.user.teamName,
        totalMatches: state.user.totalMatches,
        wonMatches: state.user.wonMatches,
        drawMatches: state.user.drawMatches,
        lossesMatches: state.user.lossesMatches,
        scoredGoals: state.user.scoredGoals,
        concededGoals: state.user.concededGoals,
        createdDate: state.user.createdDate,
        totalTournaments: state.user.totalTournaments,
        wonTrophies: state.user.wonTrophies
    };
};

const mapDispatchToProps = dispatch => {
    return{
        getUser: (username, token) => dispatch(userActionCreators.getUser(username, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);