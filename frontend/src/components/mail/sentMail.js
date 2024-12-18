import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMail } from '../../store/sentmailSlice';
import "./ComposeMail.css";
import "./sentmail.css"
import { Row, Col,Button} from "react-bootstrap";

export default function ComposeMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sentMails,error } = useSelector((state) => state.getmail);
  const { token, name } = useSelector((state) => state.auth);

  // const sentMail=[{_id:1234,to:'rk123',subject:'formal',content:'hiiiii'},{_id:45678,to:'thyu234',subject:'informal',content:'hellloo'}]

  useEffect(() => {
    if (token) {
      dispatch(getMail({ token }));
    }
  }, [token, dispatch]);

  return (
    <div style={{width:'98%',marginTop:'10px'}}>
          {sentMails && sentMails.length >0 ? (
           <>
               {sentMails.map((mail) => (
                <Row key={mail._id} className='row'>
                    <Col ><strong>To:</strong> {mail.to || "Unknown"}</Col>
                    <Col> <strong>Subject:</strong> {mail.subject || "No Subject"}</Col>
                    <Col>
                    <button
                    className="btn btn-link"
                    onClick={() => navigate(`/mail/${mail._id}`)}>View Details</button>
                    </Col>
                </Row>
              ))}</>
             
          ) : (
            <p style={{marginTop:'200px',marginLeft:"300px",fontSize:'25px',fontWeight:'bold'}}>{error}</p>
          )}
    </div>
  );
}
