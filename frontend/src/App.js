import Signup from "./components/Auth/Signup";
import { Routes, Route} from "react-router-dom";

function App() {
  return (
   <Routes>
    <Route path="/signup" element={<Signup></Signup>}></Route>
   </Routes>
  );
}

export default App;
