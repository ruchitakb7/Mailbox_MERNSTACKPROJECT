import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Modal, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import pic from "../../assets/pic.webp";
import "./divUI.css";
import {
  updateResetDetails,
  forgotPasswordRequest,
  clearFeedbackModal,
} from "../../store/forgotpasswordSlice";

const Forgotpass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetDetails, isSubmitting, feedbackMessage, showFeedbackModal, apiError } =
    useSelector((state) => state.forgotPass);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(updateResetDetails({ field: name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPasswordRequest(resetDetails));
  };

  const handleModalClose = () => {
    dispatch(clearFeedbackModal());
    navigate("/login");
  };

  return (
    <div className="maindiv">
      <div className="left-div" style={{ justifyContent: "center" }}>
        <h5>Reset Password</h5>
        <Image
          src={pic}
          alt=""
          className="img-fluid mb-3"
          style={{ maxWidth: "60%", height: "auto" }}
        />
      </div>
      <div className="right-div" style={{ marginRight: "5px" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              size="sm"
              className="w-100"
              name="email"
              value={resetDetails.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-1">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              size="sm"
              name="newPassword"
              value={resetDetails.newPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <div className="text-center mt-3 mb-2">
            <Button variant="primary" type="submit" className="w-100" disabled={isSubmitting}>
              {isSubmitting ? "Changing..." : "Change"}
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate("/login")}
              className="w-100 mt-2"
            >
              Cancel
            </Button>
          </div>
        </Form>

        <Modal show={showFeedbackModal} onHide={handleModalClose} centered>
          <Modal.Header>
            <Modal.Title>{apiError ? "Error" : "Success"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <center>
              <p>{apiError || feedbackMessage}</p>
            </center>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={handleModalClose}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Forgotpass;
