
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ComposeMail.css';
import Editor from "./maileditor"

export default function ComposeMail() {

  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();
  const { name } = useSelector((state) => state.auth.name);

  function handleSend() {
    if (!to || !subject || !content) {
      alert('All fields are required!');
      return;
    }

    const mailDetails = {
      to,
      subject,
      content,
    };

    console.log('Mail Sent:', mailDetails);

    navigate('/mail/sent');
  }

  return (
    <div className="compose-mail-container">
      <header className="bg-primary text-white p-1 d-flext justify-content-between">
        <h6>Compose Mail</h6>
        <button className="btn btn-light float-end" onClick={() => navigate(-1)}>
          ✕
        </button>
      </header>
      <div className="p-3">
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="from" className="form-label me-2">
            From:
          </label>
          <input
            type="email"
            className="form-control flex-grow-1 "
            defaultValue={name}
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
            onChange={(e) => setTo(e.target.value)}
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
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
            <Editor></Editor>
        </div>
        <div className="mb-3 d-flex flex-column">
          <label htmlFor="content" className="form-label">
            Content:
          </label>
          <textarea
            id="content"
            className="form-control"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button className="btn btn-primary w-100" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}
