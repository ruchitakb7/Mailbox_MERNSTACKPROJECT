import React,{useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./ComposeMail.css"
import { Button ,Modal} from "react-bootstrap";
import { deletemailbySender,resetcomp } from "../../store/sentmailSlice";

export default function InboxDetails() {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const { sentMails,response } = useSelector((state) => state.getmail);
  const {token}=useSelector((state)=>state.auth)
  const [show,setModal]=useState(false)
  
  const message = sentMails.find((msg) => msg.id === id);
 
  
  const deleteMail=()=>{
    dispatch(deletemailbySender({token,id}))
  }
  
   useEffect(() => {
      if (response) setModal(true);
    }, [response]);

    const onHide=()=>{
           setModal(false)
           dispatch(resetcomp())
           navigate('/mail/sent')
        }

  return (
    <div className="compose-mail-container" style={{padding:'2px'}}>
          <header className="bg-primary text-white d-flex justify-content-between">
          <Button className="btn btn-dark" size="sm" onClick={() => navigate('/mail/sent')}> ← Back</Button>
          {message && (<Button className="btn btn-dark" size="sm" onClick={()=>deleteMail()} >Delete </Button>)}  
          </header>
          {message ? (
        <div className="p-3">
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="to" className="form-label me-2">
              To:
            </label>
            <input
              type="email"
              id="to"
              className="form-control flex-grow-1"
              value={message.to}
              readOnly
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="subject" className="form-label me-2">
              Subject:
            </label>
            <input
              type="text"
              id="subject"
              className="form-control flex-grow-1"
              value={message.subject}
              readOnly
            />
          </div>
          <div className="mb-3">
            <label htmlFor="content" className="form-label">
              Message Content:
            </label>
            <textarea
              id="content"
              className="form-control"
              value={message.content}
              rows={6}
              readOnly
            />
          </div>
        </div>
      ) : (
        <div className="text-center mt-4 text-danger">
          <p>Message not found.</p>
        </div>
      )}

       <Modal  show={show} onHide={onHide}>
              <Modal.Header>
                <h6>Success</h6>
              </Modal.Header>
              <Modal.Body><center><p>{response}</p></center> </Modal.Body>
              <Modal.Footer>
              <Button  onClick={onHide}>ok</Button>
              </Modal.Footer>
            </Modal>
          
    </div>
  );
}
