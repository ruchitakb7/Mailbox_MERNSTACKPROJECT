import React, { Fragment,useEffect } from "react";
import "./mail.css";
import { ListGroup, Image,Button } from "react-bootstrap";
import pic from "../../assets/pic.webp";
import { NavLink, Outlet } from "react-router-dom";
import { logout } from "../../store/authSlice";
import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import { fetchInbox } from "../../store/inboxSlice";

import io from "socket.io-client"
const socket = io('http://localhost:5000');
console.log(socket)

const Mail = () => {
 
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {unseenMessagesCount}=useSelector((state)=>state.inbox)
  const {userId,token}=useSelector((state)=>state.auth)

  const logOut=()=>{
    dispatch(logout())
    navigate('/login')
  }

  useEffect(() => {
    socket.on('new-mail', (data) => {
      console.log('New mail received:');
      if(userId===data.receiverId){
        console.log('New mail received:');
        toast(`You have received a new mail`, {
          position: "top-right",
          autoClose: 3000,
          type: "info",
        })
        dispatch(fetchInbox(token))
      }
      });
      socket.on('error', (error) => {
        console.error('WebSocket connection error:', error);
      })

    return () => {
      socket.disconnect();
    };
  }, [dispatch,userId,token]);

  return (
    <Fragment>
      <ToastContainer/>
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
