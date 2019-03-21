import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Header from '../../components/UI/Header/Header';
import {Doughnut} from 'react-chartjs-2';
import {userActionCreators} from './user.actionCreators';

import './User.css';
import '../../common/css/common.css';

import userSample from '../../assets/images/user-sample.png';

class User extends Component{
    componentWillMount(){
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

        const matchesData = {labels:['Vittorie: ' + this.props.wonMatches,'Pareggi: ' + this.props.drawMatches,'Sconfitte: ' + this.props.lossesMatch],datasets:[{data:[this.props.wonMatches,this.props.drawMatches,this.props.lossesMatch],backgroundColor:['#31be51','#FFCE56','#e43546'],hoverBackgroundColor:['#31be51','#FFCE56','#e43546']}]};
        const goalData = {labels:['Gol fatti: ' + this.props.scoredGoals,'Gol subiti: ' + this.props.concededGoals],datasets:[{data:[this.props.scoredGoals,this.props.concededGoals],backgroundColor:['#17a2b8','#fd7e14'],hoverBackgroundColor:['#17a2b8','#fd7e14']}]};

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
                                            <i className="far fa-edit"/>
                                        </NavLink>
                                    </h4>
                                </div>

                                <hr className="hr-style-bg"/>
                                
                                <div className="row">
                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-male"/>&nbsp;Nome</small>
                                        <p>{this.props.name && this.props.surname ? 'N/A' : this.props.name + ' ' + this.props.surname}</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text"><i className="fas fa-birthday-cake"/>&nbsp;Età</small>
                                        <p>{this.checkStringEmptyOrNull(this.props.age)}</p>
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
                                        <small className="small-text"><i className="fas fa-envelope"/>&nbsp;Mail</small>
                                        <p>{this.checkStringEmptyOrNull(this.props.email)}</p>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i className="fas fa-mobile-alt"/>&nbsp;Telefono</small>
                                        <p>{this.checkStringEmptyOrNull(this.props.telephone)}</p>
                                    </div>
                                </div>

                                <hr className="hr-style-bg"/>

                                <div className="row">
                                    <div className="col-12">
                                        <small className="small-text"><i className="fas fa-calendar-alt"/>&nbsp;Joined</small>
                                        <p>{this.props.createdDate}</p>
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
                                        <p>this.props.totalMatches</p>
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
                                        {console.log(this.props.totalMatches)}
                                        {console.log(this.props.scoredGoals)}
                                        {console.log(this.props.totalMatches / this.props.scoredGoals)}
                                        <p>{this.props.totalMatches / this.props.scoredGoals}</p>
                                    </div>

                                    <div className="col-6">
                                        <small className="small-text">Media gol subiti</small>
                                        <p>{this.props.totalMatches / this.props.concededGoals}</p>
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
        getUser: (username, token) => dispatch(userActionCreators.getUser(username, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);