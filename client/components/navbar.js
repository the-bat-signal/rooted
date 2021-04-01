import React from 'react'
import '../../public/style.css'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
// import {ReactComponent as Logo} from '../../public/images/rooted-logo.svg'

import 'bootstrap/dist/css/bootstrap.min.css'

export const NavBar = () => {
  return (
    <Navbar collapseOnSelect expand="xl" bg="light" variant="light">
      <Navbar.Brand href="#/">
        <img
          alt=""
          width="150"
          className="d-inline-block align-top"
          src="/images/rooted-logo.svg"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">Contact</Nav.Link>
          <Nav.Link eventKey={2} href="#memes">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
