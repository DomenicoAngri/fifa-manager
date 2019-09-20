import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Header from '../../components/UI/Header/Header';

class Dashboard extends Component{
    render(){
        let menuType = 'user';

        if(this.props.isAdmin){
            menuType = 'admin';
        }
        else if(this.props.isSuperAdmin){
            menuType = 'superAdmin';
        }

        return(
            <Auxiliary>
                <Header menuType={menuType}/>
                
                <div className="container">
                    <div className="row">
                        <div className="alert alert-warning card-login-height col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12" role="alert">
                            <h4 className="alert-heading">Contatta un amministratore!</h4>
                                <p>Sembra che tu non sia iscritto ad alcuna lega, contatta un amministratore per partecipare al torneo!</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="alert alert-warning card-login-height col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12" role="alert">
                            <h4 className="alert-heading">Contatta un amministratore!</h4>
                                <p>Sembra che tu non sia iscritto ad alcuna lega, contatta un amministratore per partecipare al torneo!</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="alert alert-warning card-login-height col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12" role="alert">
                            <h4 className="alert-heading">Contatta un amministratore!</h4>
                                <p>Sembra che tu non sia iscritto ad alcuna lega, contatta un amministratore per partecipare al torneo!</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="alert alert-warning card-login-height col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12" role="alert">
                            <h4 className="alert-heading">Contatta un amministratore!</h4>
                                <p>Sembra che tu non sia iscritto ad alcuna lega, contatta un amministratore per partecipare al torneo!</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="alert alert-warning card-login-height col-xl-4 offset-xl-4 col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 col-12" role="alert">
                            <h4 className="alert-heading">Contatta un amministratore!</h4>
                                <p>Sembra che tu non sia iscritto ad alcuna lega, contatta un amministratore per partecipare al torneo!</p>
                        </div>
                    </div>
                </div>
            </Auxiliary>            
        );
    }
}

const mapStateToProps = state => {
    return{
        isSuperAdmin: state.start.isSuperAdmin,
        isAdmin: state.start.isAdmin
    };
};

export default withRouter(connect(mapStateToProps, null)(Dashboard));