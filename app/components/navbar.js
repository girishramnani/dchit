import React from 'react';
import { Alert, Form, FormGroup, FormControl, HelpBlock, Button, Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
export default class DNavbar extends React.Component {

    render() {

        return (
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
            <a href="/">DCHIT</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
                <LinkContainer to="/chits">
                    <NavItem eventKey={1} >
                        Chits
                    </NavItem>
                </LinkContainer>
            </Nav>
            <Nav pullRight>
            <NavItem eventKey={3} href="#">
            Become organizer
            </NavItem>
            <LinkContainer to="/chits/2">
                    <NavItem eventKey={2} >
                        My Chits
                    </NavItem>
            </LinkContainer>
            <LinkContainer to="/profile">
                <NavItem eventKey={4} >
                    My Profile
                </NavItem>
            </LinkContainer>

            </Nav>
        </Navbar.Collapse>
        </Navbar>
        )
    }

}


