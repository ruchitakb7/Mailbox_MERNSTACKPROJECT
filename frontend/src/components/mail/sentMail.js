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
                    <Col><strong>Sent On:</strong> {mail.date}</Col>
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


// import React, { useEffect,useState} from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { getMail } from '../../store/sentmailSlice';
// import "./ComposeMail.css";
// import "./sentmail.css";
// import { Row, Col, Button } from "react-bootstrap";

// export default function ComposeMail() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//  // const { mailId } = useParams(); // Retrieve mail ID from the URL
//  const [selectedMail, setSelectedMail] = useState(null);
//   const { sentMails, error } = useSelector((state) => state.getmail);
//   const { token } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (token) {
//       dispatch(getMail({ token }));
//     }
//   }, [token, dispatch]);

//   // Find the selected mail if `mailId` exists
//   // const  = mailId
//   //   ? sentMails.find((mail) => mail.id === mailId)
//   //   : null;

//   return (
//     <div style={{ width: '98%', marginTop: '10px' }}>
//       {selectedMail ? (
//         // Show mail details
//         <div>
//           <Button
//             variant="link"
//             onClick={() => navigate(-1)}
//             style={{ marginBottom: '10px' }}
//           >
//             ← Back
//           </Button>
//           <h3>{selectedMail.subject}</h3>
//           <p><strong>To:</strong> {selectedMail.to}</p>
//           <p><strong>Sent On:</strong> {selectedMail.date}</p>
//           <p>{selectedMail.content}</p>
//         </div>
//       ) : (
//         // Show list of sent mails
//         sentMails && sentMails.length > 0 ? (
//           <>
//             {sentMails.map((mail) => (
//               <Row key={mail.id} className='row'>
//                 <Col><strong>To:</strong> {mail.to || "Unknown"}</Col>
//                 <Col><strong>Subject:</strong> {mail.subject || "No Subject"}</Col>
//                 <Col><strong>Sent On:</strong> {mail.date}</Col>
//                 <Col>
//                   <button
//                     className="btn btn-link"
//                     onClick={() => setSelectedMail(mail)}
//                   >
//                     View Details
//                   </button>
//                 </Col>
//               </Row>
//             ))}
//           </>
//         ) : (
//           <p style={{
//             marginTop: '200px',
//             marginLeft: "300px",
//             fontSize: '25px',
//             fontWeight: 'bold'
//           }}>
//             {error || "No sent mails available"}
//           </p>
//         )
//       )}
//     </div>
//   );
// }
