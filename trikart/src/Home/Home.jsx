import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Home = () => {

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col>
          <h1>Welcome to the Home Page</h1>
          <p className="mt-3">
            Explore our wide range of products and find the best deals for you.
          </p>
          
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
