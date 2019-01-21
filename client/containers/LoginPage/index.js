import React, { Component } from 'react';
import { Row } from 'simple-flexbox';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { loginUser, emailChanged, passwordChanged } from '../../actions';

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange(ev) {
        this.props.emailChanged(ev.target.value);
    }

    onPasswordChange(ev) {
        this.props.passwordChanged(ev.target.value);
    }

    onLoginPress() {
        const { email, password } = this.props;
        this.props.loginUser({
            email, password
        });
    }

    render() {
        return (
            <Row>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="john.doe@gmail.com"
                            onChange={this.onEmailChange}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Your password"
                            onChange={this.onPasswordChange}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Button
                            block
                            color='primary'
                            onClick={this.onLoginPress.bind(this)}>
                            Sign in
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <div style={{textAlign: 'center'}}>
                            Need an account?
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <Link to='/register'>Sign up</Link>
                        </div>
                    </FormGroup>
                </Form>
            </Row>
        )
    }
}

const mapStateToProps = state => {

    return {
        email: state.auth.email,
        password: state.auth.password,
        token: state.auth.token
    };
}

export default connect(mapStateToProps, {loginUser, emailChanged, passwordChanged})(LoginPage);