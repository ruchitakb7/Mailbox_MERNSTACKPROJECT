import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditorComponent from "./maileditor";
import { Button } from 'react-bootstrap';
import { updateTo, updateSubject, updateContent, sendMail } from '../../store/composeSlice';
import "./ComposeMail.css"

export default function ComposeMail() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { to, subject, content, status, error } = useSelector((state) => state.compose);

  const {token,name} =useSelector((state)=>state.auth)
  console.log(token)
  function handleSend() {
    const mailDetails = {
      to,
      subject,
      content: JSON.stringify(content),
    };
    console.log(mailDetails)

    if (!to || !subject || !content) {
      alert('All fields are required!');
      return;
    }

    dispatch(sendMail({ mailDetails, token: token }));
  }

  return (
    <div className="compose-mail-container">
      <header className="bg-primary text-white d-flex justify-content-between fs-2">
        <h6>Compose Mail</h6>
        <Button size='sm' className='btn-dark' onClick={() => navigate(-1)}>✕</Button>
      </header>
      <div className="p-3">
      <div className="mb-3 d-flex align-items-center">
          <label htmlFor="to" className="form-label me-2">
            From:
          </label>
          <input
            type="email"
            className="form-control flex-grow-1"
            value={name}
           readOnly
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="to" className="form-label me-2">
            To:
          </label>
          <input
            type="email"
            id="to"
            className="form-control flex-grow-1"
            value={to}
            onChange={(e) => dispatch(updateTo(e.target.value))}
            required
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
            value={subject}
            onChange={(e) => dispatch(updateSubject(e.target.value))}
          />
        </div>
        <div>
        <EditorComponent onContentChange={(contentState) => dispatch(updateContent(contentState))}/>
        </div>
        <button className="btn btn-primary w-100" onClick={handleSend} disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Send'}
        </button>
        {status === 'failed' && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
}
