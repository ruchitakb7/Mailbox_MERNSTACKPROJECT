import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox } from "../../store/inboxSlice";
import { useNavigate } from "react-router-dom";
import "./inbox.css"
import { Link } from "react-router-dom";

export default function Inbox() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { inboxData, status, error } = useSelector((state) => state.inbox);
  console.log(inboxData)
  const { token } = useSelector((state) => state.auth); 

  useEffect(() => {
    if (token) {
      dispatch(fetchInbox(token));
    }
  }, [token, dispatch]);

  if (status === "loading") return <p>Loading...</p>;
 


  return (
    <div className="container my-5 mt-1">
      {inboxData.length === 0 ? (
        <p  style={{ marginTop: '200px', marginLeft: "300px", fontSize: '25px', fontWeight: 'bold' }}>{error}</p>
      ) : (
        <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th>From</th>
              <th>Subject</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
          {inboxData.map((message) => (
              <tr key={message.id} className={message.isSeen ? "" : "font-weight-bold"}>
                <td> {!message.isSeen && <span className="blue-dot"></span>}</td>
                <td>{message.from}</td>
                <td>
                <Link to={`/mail/inbox/${message.id}`} className="text-decoration-none" 
                style={{ cursor: "pointer" }}>{message.subject}</Link>
                </td>
                <td>{new Date(message.date).toLocaleString()}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
  );

  
}
