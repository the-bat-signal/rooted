import React from 'react'
import '../../public/style.css'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
// import {ReactComponent as Logo} from '../../public/images/rooted-logo.svg'

// import 'bootstrap/dist/css/bootstrap.min.css'

export const NavBar = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="xl"
      bg="light"
      variant="light"
      style={{zIndex: 100, height: 100}}
      sticky="top"
    >
      <Navbar.Brand href="/">
        <img
          alt=""
          width="75"
          className="d-inline-block align-top"
          src="/images/rooted-logo.svg"
        />{' '}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/SignIn">Sign In</Nav.Link>
          <Nav.Link href="/map">Map</Nav.Link>
          <NavDropdown title="Learn" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/language/Cherokee">
              Cherokee
            </NavDropdown.Item>
            <NavDropdown.Item href="/language/Dakota">Dakota</NavDropdown.Item>
            <NavDropdown.Item href="/language/Mohegan">
              Mohegan-Pequot
            </NavDropdown.Item>
            {/* <NavDropdown.Divider /> */}
            <NavDropdown.Item href="/language/Diné Bizaad">
              Diné Bizaad
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {/* <Nav.Link href="/contact">Contact</Nav.Link> */}
          <Nav.Link eventKey={2} href="/About">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavBar
