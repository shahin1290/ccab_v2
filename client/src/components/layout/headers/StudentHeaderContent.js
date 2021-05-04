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
  
  export default function StudentHeaderContnet() {
      return (
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/course-grid">Courses</Nav.Link>
          <NavDropdown title="Tests" id="collasible-nav-dropdown">
            <NavDropdown.Item href="/quizzes">Quiz</NavDropdown.Item>
            <NavDropdown.Item href="/assignments">Assignment</NavDropdown.Item>
      </NavDropdown>
      </Nav>
  
  
  
      )
  }
  