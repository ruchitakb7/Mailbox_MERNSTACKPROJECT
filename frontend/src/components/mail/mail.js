
import React, { Fragment } from "react";
import "./mail.css";
import { ListGroup, Image,Button } from "react-bootstrap";
import pic from "../../assets/pic.webp";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch,useSelector } from "react-redux";

const Mail = () => {
 
  const dispatch=useDispatch()
  const {unseenMessagesCount}=useSelector((state)=>state.inbox)

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
          <ListGroup>
            <NavLink to="/mail/compose" className="list-space" activeClassName="active">
              Compose
            </NavLink>
            <NavLink to="/mail/sent" className="list-space" activeClassName="active">
              Sent Mail
            </NavLink>
            <NavLink to="/mail/inbox" className="list-space" activeClassName="active">
              Inbox 
              {unseenMessagesCount > 0 && (
               <span className="unseen-count-badge">+{unseenMessagesCount}</span>)}
            </NavLink>
          </ListGroup>
          <Button onClick={dispatch(logout())}>Sign Out</Button>
        </div>
        <div className="rightdiv">
          <div className="rightcont">
            {/* Outlet renders nested route content */}
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Mail;
