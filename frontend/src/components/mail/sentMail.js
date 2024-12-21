import React, { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
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
                <Row key={mail.id} className='row'>
                    <Col ><strong>To:</strong> {mail.to || "Unknown"}</Col>
                    <Col> <strong>Subject:</strong> {mail.subject || "No Subject"}</Col>
                    <Col><strong>Sent On:</strong>{new Date(mail.date).toLocaleString()}</Col>
                    <Col>
                    <Link to={`/mail/sent/${mail.id}`}>View Details</Link>
                    </Col>
                </Row>
              ))}</>
             
          ) : (
            <p style={{marginTop:'200px',marginLeft:"300px",fontSize:'25px',fontWeight:'bold'}}>{error}</p>
          )}
    </div>
  );
}
 
