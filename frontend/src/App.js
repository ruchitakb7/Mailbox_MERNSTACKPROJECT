

import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Mail from "./components/mail/mail";
import Compose from "./components/mail/compose";
import Sent from "./components/mail/sentMail";
import Inbox from "./components/mail/inbox";
import MailDetail from "./components/mail/mailDetail";
import InboxDetails from "./components/mail/inboxdetail";
import Forgotpass from "./components/Auth/forgotpassword"
import { useSelector } from "react-redux";

function App() {

  const {token} = useSelector((state)=>state.auth)
  return (
    
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<Forgotpass />} />

          <Route path="/mail/*" element={<Mail />}>
          <Route path="compose" element={<Compose />} />
          <Route path="sent" element={<Sent />} />
          <Route path="sent/:id" element={<MailDetail />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="inbox/:id" element={<InboxDetails/>} />
         
        </Route>
        <Route  path="/mail"  element={<Navigate to="/mail/inbox" />} /> 
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  
  );
}

export default App;

