import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./ComposeMail.css"
import { Button } from "react-bootstrap";
import { deleteinboxmail } from "../../store/inboxSlice";

export default function InboxDetails() {

  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
  const dispatch=useDispatch()

  const { inboxData,response,error} = useSelector((state) => state.inbox);
  const {token}=useSelector((state)=>state.auth)
  
  const message = inboxData.find((msg) => msg.id === id);

  const deleteMail=()=>{
     dispatch(deleteinboxmail({token,id}))
     alert(response)
     navigate('/mail/inbox')
  }

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
          
    </div>
  );
}
