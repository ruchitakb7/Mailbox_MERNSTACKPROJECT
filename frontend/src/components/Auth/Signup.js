import React from "react";
import { Row, Col, Form, Image, Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFormData, signupUser, resetModal } from "../../store/authSlice";
import "./loginform.css";
import pic from "../../assets/pic.webp";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { formData, showModal,formsignErrors,modalMessage } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    dispatch(updateFormData({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ formData, navigate }));
  };

  const onHide = () => {
    dispatch(resetModal())
    navigate("/login");
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
                required
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
                required
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
                required
              />
            </Form.Group>

            <div className="text-center mt-3 mb-2">
              <Button variant="primary" type="submit" className="w-100">
                Sign Up
              </Button>
            </div>
            <div>
              <p> Already have an account?{" "}
                <span>
                  <Link
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                    to="/login">
                    Login
                  </Link>
                </span>
              </p>
            </div>
          </Form>

          {formsignErrors && (
               <div className="text-danger mb-3 centred">
                 {typeof formsignErrors === "string" ? formsignErrors : JSON.stringify(formsignErrors)}
              </div>)}
        </Col>
      </Row>

      <Modal show={showModal} onHide={onHide} centered>
        <Modal.Header>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <center><p>{modalMessage}</p></center> 
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={onHide}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Signup;

