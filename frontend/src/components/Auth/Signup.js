import React, { useState } from "react";
import { Row, Col, Form, Image, Button,Modal } from "react-bootstrap";
import "./loginform.css";
import pic from "../../assets/pic.webp";
import axios from "axios";


const Signup = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [modalError, setModalError] = useState(""); 
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', formData);
      
      setModalError(response.data.message);
      setShowModal(true)
      setFormData({
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error signing up:", error);
      setModalError(error.response?.data?.message || "An error occurred");
      setShowModal(true)
    }
    
  };

  return (
    <div className="formcont">
      <Row className="justify-content-center align-items-center">
        <Col md={6} className="text-center">
          <h4>Create Account</h4>
          <Image
            src={pic}
            alt=""
            className="img-fluid mb-3"
            style={{ maxWidth: "80%", height: "auto" }}
          />
        </Col>

        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                size="sm"
                className="w-100"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
            <div className="text-center mt-3">
              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="sm">
        <Modal.Header closebutton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modalError}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;
