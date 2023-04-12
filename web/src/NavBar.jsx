import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Container from "react-bootstrap/Container";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="primary"
      fixed="top"
      variant="dark"
    >
      <Container>
        <Link to="/" className="navbar-brand">
          E-Paper Templates
        </Link>
        <Navbar.Toggle aria-controls="nav-items" />
        <Navbar.Collapse id="nav-items">
          <Nav className="navbar-nav">
            <Nav.Item>
              <NavLink to="/templates" className="nav-link">
                Templates
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/settings" className="nav-link">
                Settings
              </NavLink>
            </Nav.Item>
            <Nav.Item>
              <NavLink to="/variables" className="nav-link">
                Variables
              </NavLink>
            </Nav.Item>
            <NavDropdown title="Images" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <NavLink to="/bitmaps" className="nav-link">
                  Bitmaps
                </NavLink>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <NavLink to="/bitmaps/_new" className="nav-link">
                  New Bitmap
                </NavLink>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
