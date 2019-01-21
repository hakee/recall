import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'simple-flexbox';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

import { registerUser, verifyEmail } from '../../actions';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onEmailChange(ev) {
        this.setState({email: ev.target.value});
    }

    onPasswordChange(ev) {
        this.setState({password: ev.target.value});
    }

    onRegisterPress() {
        const { email, password } = this.state;
        this.props.registerUser({
            email, password
        })
    }

    render() {
        return (
            <Row>
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="email" name="email" id="email" placeholder="john.doe@gmail.com"  onChange={this.onEmailChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Password</Label>
                        <Input type="password" name="password" id="password" placeholder="Something..." onChange={this.onPasswordChange} />
                    </FormGroup>
                    <FormGroup>
                        <Button block color='success' onClick={this.onRegisterPress.bind(this)}>
                            Sign up
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <div>
                            Already have an account?
                        </div>
                        <div style={{textAlign: 'center'}}>
                            <Link to='/login'>Sign in</Link>
                        </div>
                    </FormGroup>
                </Form>
            </Row>
        )
    }
}


export default connect(null, {registerUser, verifyEmail})(RegisterPage);