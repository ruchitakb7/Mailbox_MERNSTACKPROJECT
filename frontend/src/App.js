

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Mail from "./components/mail/mail";
import Compose from "./components/mail/compose";
import Sent from "./components/mail/sentMail";
import Inbox from "./components/mail/inbox";
import MailDetail from "./components/mail/mailDetail";
import InboxDetails from "./components/mail/inboxdetail";

function App() {
  return (
    
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Mail Routes */}
        <Route path="/mail/*" element={<Mail />}>
          <Route path="compose" element={<Compose />} />
          <Route path="sent" element={<Sent />} />
          <Route path="sent/:id" element={<MailDetail />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="inbox/:id" element={<InboxDetails/>} />
        </Route>
      </Routes>
  
  );
}

export default App;

