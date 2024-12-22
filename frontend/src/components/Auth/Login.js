import React from "react";
import { Form, Modal, Button,Image } from "react-bootstrap"
import './divUI.css'
import { Link, useNavigate } from "react-router-dom";
import pic from "../../assets/pic.webp"
import { useDispatch, useSelector } from "react-redux";
import { updateUserData, loginUser, resetModal } from "../../store/authSlice";

const Login = () => {
 
   const dispatch=useDispatch()
   const navigate=useNavigate()
   const { token,userData, showModal,formlogErrors,modalMessage } = useSelector((state) => state.auth)
  

  const handleChange = (e) => {
     dispatch(updateUserData({ name: e.target.name, value: e.target.value }));
  };

  const handleSubmit = async (e) => {
     e.preventDefault();
     dispatch(loginUser({ userData, navigate }));  
    } 

    const onHide = () => {
        dispatch(resetModal())
       navigate('/mail')
      };
    

  return (
    <div className="maindiv">
        <div className="left-div" style={{justifyContent:'center'}}>
        <h5>Login In To Mailbox</h5>
        <Image
            src={pic}
            alt=""
            className="img-fluid mb-3"
            style={{ maxWidth: "60%", height: "auto" }}
          />
          
        </div>
         <div class="right-div" style={{marginRight:'5px'}}>
         <Form onSubmit={handleSubmit}>
             <Form.Group className="mb-3">
               <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                size="sm"
                className="w-100"
                name="email"
                value={userData.email}
                onChange={handleChange}
                 />
                
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                size="sm"
                name="password"
                value={userData.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Link className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            to="/forgot-password">Forgot password?</Link>
            <div className="text-center mt-3 mb-2">
              <Button variant="primary" type="submit" className="w-100">
                Login
              </Button>
            </div>
          </Form>
          <div><p>Don't have an account?{" "}<span><Link className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                              to="/signup">Signup</Link></span></p>
                      </div>{formlogErrors && (
               <p className="text-danger mb-3 centred">
                 {typeof formlogErrors === "string" ? formlogErrors : JSON.stringify(formlogErrors)}
              </p>)}
         </div>
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

export default Login;
