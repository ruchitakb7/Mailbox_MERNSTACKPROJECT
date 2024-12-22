import React, { useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMail } from '../../store/sentmailSlice';
import "./ComposeMail.css";
import "./sentmail.css"
import { Row, Col,Button} from "react-bootstrap";

export default function ComposeMail() {
  const dispatch = useDispatch();
  const { sentMails, error,response } = useSelector((state) => state.getmail);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getMail({ token }));
    }
  }, [token, dispatch]);

  const groupMailsByDate = (mails) => {
    const grouped = {};
    mails.forEach((mail) => {
      const date = new Date(mail.date).toLocaleDateString(); 
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(mail);
    });
    return grouped;
  };

  const groupedMails = sentMails ? groupMailsByDate(sentMails) : {};

  return (
    <div style={{ width: '98%', marginTop: '10px',height:'90%', overflowY: 'auto', 
      overflowX: 'hidden',}}>
        <p>Total:{sentMails.length}</p>
      {Object.keys(groupedMails).length > 0 ? (
        Object.entries(groupedMails).map(([date, mails]) => (
          <div key={date} className="grouped-mails">
            <h6 style={{ marginTop: '20px', color: 'blue' }}>{date}</h6>
            <hr style={{ margin: '10px 0' }} />
            {mails.map((mail) => (
              <Row key={mail.id} className="row" style={{ marginBottom: '10px',marginLeft:'20px' }}>
                <Col><strong>To:</strong> {mail.to || "Unknown"}</Col>
                <Col><strong>Subject:</strong> {mail.subject || "No Subject"}</Col>
                <Col><strong>Time:</strong>{new Date(mail.date).toLocaleTimeString()}</Col>
                <Col>
                  <Link to={`/mail/sent/${mail.id}`}>View Details</Link>
                </Col>
              </Row>
            ))}
          </div>
        ))
      ) : (
        <p style={{ marginTop: '200px', marginLeft: "300px", fontSize: '25px', fontWeight: 'bold' }}>
          {error || "No sent mails found."}
        </p>
      )}
    </div>
  );
}
