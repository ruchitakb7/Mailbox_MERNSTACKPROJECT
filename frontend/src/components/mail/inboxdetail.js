import React from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import "./ComposeMail.css"
import { Button } from "react-bootstrap";

export default function InboxDetails() {
  const { id } = useParams();
  console.log(id)
  const navigate = useNavigate();
   const { inbox } = useSelector((state) => state.inbox);
  
  const message = inbox.find((msg) => msg.id === id);

  return (
    <div className="compose-mail-container" style={{padding:'2px'}}>
          <header className="bg-primary text-white d-flex justify-content-between">
          <Button className="btn btn-dark" size="sm" onClick={() => navigate('/mail/sent')}> ← Back</Button>
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
        </div>
      ) : (
        <div className="text-center mt-4 text-danger">
          <p>Message not found.</p>
        </div>
      )}
          
    </div>
  );
}
