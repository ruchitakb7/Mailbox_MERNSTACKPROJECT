import React,{useEffect,useState} from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./ComposeMail.css"
import { Button,Modal } from "react-bootstrap";
import { deleteinboxmail, markasSeen,fetchInbox,resetinbox } from "../../store/inboxSlice";

export default function InboxDetails() {

  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch=useDispatch()

  const { inboxData,response,error} = useSelector((state) => state.inbox);
  const {token}=useSelector((state)=>state.auth)
  const [show,setModal]=useState(false)
  
  const message = inboxData.find((msg) => msg.id === id);

  const deleteMail=()=>{
     dispatch(deleteinboxmail({token,id}))
  }

  useEffect(() => {
        if (response) setModal(true);
      }, [response]);

  const onHide=()=>{
       setModal(false)
       dispatch(resetinbox())
       navigate('/mail/inbox')
    }

  useEffect(()=>{
    if(!message.isSeen)
    dispatch(markasSeen({token,id}))
    dispatch(fetchInbox(token))
  },[dispatch,id,message.isSeen])

  return (
    <div className="compose-mail-container" style={{padding:'2px'}}>
          <header className="bg-primary text-white d-flex justify-content-between">
          <Button className="btn btn-dark" size="sm" onClick={() => navigate('/mail/inbox')}> ← Back</Button>
          <Button className="btn btn-dark" size="sm" onClick={()=> deleteMail()} >Delete </Button>
          </header>
          {message ? (
        <div className="p-3">
          <div className="mb-3 d-flex align-items-center">
            <label htmlFor="to" className="form-label me-2">
              From:
            </label>
            <input
              type="email"
              id="from"
              className="form-control flex-grow-1"
              value={message.from}
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
          {error && <p>{error}</p>}
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
