import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

function Home() {
  return (
    <Container fluid className="text-center home-container">
      <Row className="justify-content-center align-items-center vh-100">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow-lg home-card">
            <Card.Body>
              <h1 className="display-4">Welcome to Our Store</h1>
              <p className="lead">Spring Boot and ReactJS project.</p>
              <hr className="my-4" />
              <div className="btn-container">
                <Link to="/login" className="btn btn-custom">Login</Link>
                <Link to="/register" className="btn btn-custom">Register</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
