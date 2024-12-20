import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchInbox } from "../../store/inboxSlice";
import { useNavigate } from "react-router-dom";

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
  //if (status === "failed") return <p>{error}</p>;


  return (
    <div className="container my-5 mt-1">
      {inboxData.length === 0 ? (
        <p className="text-center">{error}</p>
      ) : (
        <table className="table table-hover">
          <thead className="thead-dark">
            <tr>
              <th></th>
              <th>From</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inboxData.map((message) => (
              <tr key={message.id} className={message.isSeen ? "" : "font-weight-bold"}>
                <td> {!message.isSeen && <span className="blue-dot me-2"></span>}</td>
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
    console.log("Delete message ID:", id);
  }
}
