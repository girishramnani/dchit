import React from 'react';
import { Alert, Form, FormGroup, FormControl, HelpBlock, Button, Navbar, Nav, NavItem } from 'react-bootstrap';
 

export default class DNavbar extends React.Component {

    render() {

        return (
        <Navbar inverse collapseOnSelect>
        <Navbar.Header>
            <Navbar.Brand>
            <a href="#brand">DCHIT</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav>
            <NavItem eventKey={1} href="#">
                Link
            </NavItem>
            <NavItem eventKey={2} href="#">
                Link
            </NavItem>
            </Nav>
            <Nav pullRight>
            <NavItem eventKey={1} href="#">
                Link Right
            </NavItem>
            <NavItem eventKey={2} href="#">
                Link Right
            </NavItem>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        )
    }

}


