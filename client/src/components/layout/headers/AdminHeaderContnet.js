import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Badge,
  Image,
  Button
} from 'react-bootstrap'
import React from 'react'

export default function AdminHeaderContnet() {
    return (
      <Nav className="mr-auto">
        <Nav.Link className="text-light navLinks" href="/">Home</Nav.Link>
        <Nav.Link className="text-light navLinks" href="/course-grid"> Courses</Nav.Link>
        <Nav.Link className="text-light navLinks" href="/admin-courses-list">Mange Courses</Nav.Link>
        <Nav.Link href="/admin-users-list">Users</Nav.Link>
    </Nav>



    )
}
