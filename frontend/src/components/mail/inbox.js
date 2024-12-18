import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox } from "../../store/inboxSlice";
import { useNavigate } from "react-router-dom";

export default function Inbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

//   const { messages, status, error } = useSelector((state) => state.inbox);
  const { token } = useSelector((state) => state.auth); // Assuming token is stored in auth state
  const messages= [
    { "id": "1", "from": "user1@example.com", "subject": "Hello!", "date": "2023-12-18", "isRead": false },
    { "id": "2", "from": "user2@example.com", "subject": "Meeting Reminder", "date": "2023-12-17", "isRead": true }
  ]

//   useEffect(() => {
//     if (token) {
//       dispatch(fetchInbox(token));
//     }
//   }, [token, dispatch]);

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Error: {error}</p>;


  return (
    <div className="container my-5">
     
      {messages.length === 0 ? (
        <p className="text-center">No messages found.</p>
      ) : (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th>From</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className={message.isRead ? "" : "font-weight-bold"}>
                <td>{message.from}</td>
                <td
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate(`/inbox/${message.id}`)}
                >
                  {message.subject}
                </td>
                <td>{message.date}</td>
                <td>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(message.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  function handleDelete(id) {
    // Implement delete functionality here
    console.log("Delete message ID:", id);
  }
}
