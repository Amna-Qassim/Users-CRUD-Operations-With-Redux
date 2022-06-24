import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUser } from "../redux/actions";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Home = () => {
  let dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);
  const usersData = users.results;
  const navigate = useNavigate();

  //
  const [isLogged, setIsLogged] = useState(true);
  useEffect(() => {
    dispatch(loadUsers());
    let token;
    try {
      token = JSON.parse(localStorage.getItem("token"));
      if (!token) {
        setIsLogged(false);
      } else {
        setIsLogged(true);
      }
    } catch (error) {
      setIsLogged(false);
    }
  }, []);

  if (!isLogged) return <Navigate to="/" />;

  //

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-content-center mt-4">
        <h2>Redux CRUD User app</h2>
        <div>
          <button
            type="button"
            className="btn btn-secondary me-3"
            onClick={() => navigate("/addUser")}
          >
            Add User
          </button>
          <button
            type="button"
            className="btn btn-light"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>
      <div className="row my-5">
        <table className="table table-bordered border border-dark">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">UserName</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          {usersData &&
            usersData.map((user, i) => {
              return (
                <tbody>
                  <tr key={user.id}>
                    <td>{i + 1}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    {user.isActive ? <td>{user.role}</td> : <td></td>}
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger mx-2"
                        onClick={() => handleDelete(user.id)}
                      >
                        Delete
                      </button>{" "}
                      <button type="button" className="btn btn-info">
                        <Link
                          className="mx-2"
                          style={{ color: "#fff" }}
                          to={{
                            pathname: "/editUser",
                          }}
                          state={user}
                        >
                          Edit
                        </Link>
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </div>
    </div>
  );
};

export default Home;
