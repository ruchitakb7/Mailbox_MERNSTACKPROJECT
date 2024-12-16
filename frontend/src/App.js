
import {  BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Mail from "./components/mail/mail";

function App() {
  return (
    
     <Routes>
    <Route path="/signup" element={<Signup></Signup>}></Route>
    <Route path="/login" element={<Login></Login>}></Route>
    <Route path="/mail" element={<Mail></Mail>}> </Route>
   </Routes>
    
  
  );
}

export default App;
