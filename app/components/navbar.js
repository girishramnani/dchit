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
            <NavItem eventKey={1} href="#">
            Become organizer
            </NavItem>
            <NavItem eventKey={2} href="#">
                My fund
            </NavItem>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        )
    }

}


