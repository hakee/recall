import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Redirect, Switch, Route, withRouter } from 'react-router-dom';
import { Column, Row } from 'simple-flexbox';
import styled from 'styled-components';

import { strongHandshake } from '../../utils/socket';

import {
    APP_LOAD
} from '../../constants/types';

import {logoutUser} from '../../actions';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import DashboardPage from '../../containers/DashboardPage';

import LoginPage from '../LoginPage';
import RegisterPage from '../RegisterPage';

import PrivateRoute from '../../components/hoc/PrivateRoute';

const AppContainer = styled.div``;

class App extends Component {
    constructor(props) {
        super(props);
        if(this.props.currentUser)
            strongHandshake(this.props.currentUser.id);
    }
    // state = {};
    componentWillMount() {
        const token = window.localStorage.getItem('jwt');
        if (token) {
            // this.props.onLoad()
        }
    }

    doLogout() {
        this.props.logoutUser();
    }

    render() {
        return (
            <AppContainer>
                <Helmet
                    titleTemplate='Recall Notes - PA'
                    defaultTitle='Recall Notes'
                >
                    <meta name='description' content='Recall your notes easy.' />
                </Helmet>
                <Column flexGrow={1}>
                    <Row horizontal="center">
                        <Header isLoggedIn={this.props.isLoggedIn} user={this.props.currentUser} doLogout={this.doLogout.bind(this)} />
                    </Row>
                    <Row horizontal='center'>
                        <Switch>
                            <PrivateRoute exact path='/' component={DashboardPage} />
                            <PrivateRoute path='/notes' component={DashboardPage} />
                            <Route path='/login' component={LoginPage} />
                            <Route path='/register' component={RegisterPage} />
                        </Switch>
                    </Row>
                    <Row horizontal="center">
                        <Footer />
                    </Row>
                </Column>
            </AppContainer>
        )
    }
}

const mapStateToProps = state => {
    return {
      appLoaded: state.base.appLoaded,
      currentUser: state.auth.user,
      isLoggedIn: state.auth.isAuth,
      token: state.auth.token,
      redirectTo: state.base.redirectTo
    }};

export default withRouter(connect(mapStateToProps, {logoutUser})(App));