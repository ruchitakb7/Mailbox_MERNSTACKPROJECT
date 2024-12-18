import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

export default function InboxDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
//   const { messages } = useSelector((state) => state.inbox);
  const messages= [
    { "id": "1", "from": "user1@example.com", "subject": "Hello!", "date": "2023-12-18", "isRead": false },
    { "id": "2", "from": "user2@example.com", "subject": "Meeting Reminder", "date": "2023-12-17", "isRead": true }
  ]

  const message = messages.find((msg) => msg.id === id);

  if (!message) return <p>Message not found.</p>;

  return (
    <div className="container my-5">
      <h2>Message Details</h2>
      <p><strong>From:</strong> {message.from}</p>
      <p><strong>Subject:</strong> {message.subject}</p>
      <p><strong>Content:</strong> {message.content}</p>
      <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
        Back to Inbox
      </button>
    </div>
  );
}
