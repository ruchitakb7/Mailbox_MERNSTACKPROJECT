
import React, { Fragment } from "react";
import "./mail.css";
import { ListGroup, Image,Button } from "react-bootstrap";
import pic from "../../assets/pic.webp";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Mail = () => {
 
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {unseenMessagesCount}=useSelector((state)=>state.inbox)

  const logOut=()=>{
    dispatch(logout())
    navigate('/login')
  }

  return (
    <Fragment>
      <header className="header">
        <p>Mailbox</p>
      </header>
      <div className="main">
        <div className="leftdiv">
          <Image
            src={pic}
            alt=""
            style={{ width: "60px", height: "60px", marginBottom: "20px" }}
          />
          <ListGroup >
            <NavLink to="/mail/compose" className="list-space" activeclassname="active">
              <Button className="Button-class btn-success">Compose</Button>
            </NavLink>
            <NavLink to="/mail/sent" className="list-space" activeclassname="active">
            <Button className="Button-class btn-success">Sent Mail</Button>
            </NavLink>
            <NavLink to="/mail/inbox" className="list-space" activeclassname="active">
            <Button className="Button-class btn-success">Inbox
              {unseenMessagesCount > 0 && (
               <span className="fw-bold text-dark space-left">  +{unseenMessagesCount}</span>)} </Button> 
            </NavLink>
          </ListGroup>
          <Button className="Button-class" onClick={()=>logOut()}>Sign Out</Button>
        </div>

        <div className="rightdiv">
          <div className="rightcont">
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Mail;
