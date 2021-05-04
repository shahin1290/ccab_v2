import React from "react";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
export default function ErrorScreen() {
  return (
    <>
      <Container className="error_screen">
        <h1>Wops! There is no match!</h1>
        <Link to="/">Please, Go back to the HomeScreen</Link>
      </Container>
    </>
  );
}
