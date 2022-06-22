import { Routes, Route } from "react-router-dom";
import Home2 from "./pages/Home2";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Login from "./pages/login/Login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/users" element={<Home2 />} />{" "}
        <Route path="/addUser" element={<AddUser />} />{" "}
        <Route path="/editUser" element={<EditUser />} />{" "}
      </Routes>
    </div>
  );
}

export default App;
