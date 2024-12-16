import React ,{Fragment} from "react";
import "./mail.css"
import { useSelector,useDispatch } from "react-redux";
import { ListGroup,Image} from "react-bootstrap";
import pic from "../../assets/pic.webp"
import { logout } from "../../store/authSlice";
import { handleClose,handleSectionChange } from "../../store/mailviewSlice";
import Compose from "./compose";
import Sent from "./sent";
import Inbox from "./inbox";

const Mail=()=>{

   const {islogin,name} =useSelector((state)=>state.auth)
   const dispatch=useDispatch()
   const activeSection=useSelector((state)=>state.mailview.activeSection)
   console.log(activeSection)

    return(
          <Fragment>
            <header className="header">
             <p>Mailbox</p>
            </header>
            <div className="main">
                <div className="leftdiv">
                <Image src={pic} alt="" style={{width:'60px',height:'60px',marginBottom:'20px'}}></Image>
                <p style={{backgroundColor:'red',marginTop:'5px'}}>{name}</p>
                 {/* {islogin && ( */}
                  <ListGroup>
                  <ListGroup.Item className="list-space" action onClick={() => dispatch(handleSectionChange('compose'))}>
                   Compose 
                 </ListGroup.Item>
                 <ListGroup.Item  className="list-space" action onClick={() => dispatch(handleSectionChange('sent email'))} >
                   Sent 
                 </ListGroup.Item>
                 <ListGroup.Item className="list-space" action onClick={() => dispatch(handleSectionChange('inbox'))}>
                  Inbox
                 </ListGroup.Item> 
                 <ListGroup.Item className="list-space" action onClick={() => dispatch(logout())} >
                  Sign Out
                 </ListGroup.Item> 
               </ListGroup>
                 {/* )} */}
                </div>
                <div className="rightdiv">
                  <div className="rightcont">
                 
                  {activeSection === 'compose' && <Compose></Compose> }
                  {activeSection === 'sent email' && <Sent></Sent>}
                  {activeSection === 'inbox' && <Inbox></Inbox>}
                  </div>
                </div>
            </div>
          </Fragment>
    )
}

export default Mail