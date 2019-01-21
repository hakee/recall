import React, { Component } from 'react';

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.onSignOut = this.onSignOut.bind(this);
        this.state = {
            isOpen: false
        }
    }

    onSignOut () {
        if(typeof this.props.doLogout === 'function') {
            this.props.doLogout();
        }
    }

    toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
    }

    renderLinks() {
        if(this.props.isLoggedIn) {
            return (
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink>
                            Welcome <b>{this.props.user.email}</b>
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <Button color='link' onClick={this.onSignOut}>Sign out</Button>
                    </NavItem>
                </Nav>
            )
        } else {
            return (
                <Nav className="ml-auto" navbar />
            )
        }
    }

    render() {
        return (
            <div>
                <Navbar color='white' light expand='md'>
                    <NavbarBrand>Recall</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            {this.renderLinks()}
                        </Collapse>
                </Navbar>
            </div>
        )
    }
}

const styles = {
    root: {
      flexGrow: 1,
    }
};

export default Header;