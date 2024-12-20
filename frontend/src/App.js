
// import {  BrowserRouter as Router, Routes, Route} from "react-router-dom";
// import Signup from "./components/Auth/Signup";
// import Login from "./components/Auth/Login";
// import Mail from "./components/mail/mail";
// import ComposeMail from "./components/mail/compose";
// import sent from "./components/mail/sentMail"
// import Inbox from "./components/mail/inbox"
// import mailDetail from "./components/mail/mailDetail"
// function App() {
//   return (
    
//      <Routes>
//     <Route path="/signup" element={<Signup></Signup>}></Route>
//     <Route path="/login" element={<Login></Login>}></Route>
//     <Route path="/mail" element={<Mail></Mail>}> </Route>
//     <Route path="/compose" element={<ComposeMail></ComposeMail>}></Route>
//     <Route path="/mail/sent" element={<sent></sent>}></Route>
//     <Route path="/inbox" element={<Inbox></Inbox>}></Route>
//     {/* <Route path="/inbox/:id" element={<mailDetail/>} /> */}
//     <Route path="/mail/sent/:mailId" element={<sent/>} />
//    </Routes>
    
  
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Mail from "./components/mail/mail";
import Compose from "./components/mail/compose";
import Sent from "./components/mail/sentMail";
import Inbox from "./components/mail/inbox";
import MailDetail from "./components/mail/mailDetail";

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
          <Route path="inbox/:id" element={<MailDetail />} />
        </Route>
      </Routes>
  
  );
}

export default App;

