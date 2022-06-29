import { Routes, Route } from "react-router-dom";
import Home2 from "./pages/Home2";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import Login from "./pages/login/Login";
import ErrorPage from "./pages/ErrorPage";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";
import { PublicRoutes } from "./utils/PublicRoutes";
import UpdateBalance from "./pages/UpdateBalance";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/users" element={<Home2 />} />
          <Route path="/addUser" element={<AddUser />} />
          <Route path="/editUser" element={<EditUser />} />
          <Route path="/balance" element={<UpdateBalance />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
