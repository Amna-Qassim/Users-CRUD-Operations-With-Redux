import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUser } from "../redux/actions";
import { useNavigate, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Table } from "antd";

const Home = () => {
  let dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.data);
  const usersData = users.results;
  const totalUsers = users.count;
  const navigate = useNavigate();
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      title: "UserName",
      dataIndex: "username",
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (_, record) => (
        <>{record.isActive ? <span>{record.role}</span> : <span></span>}</>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div>
          <button
            type="button"
            className="btn btn-danger mx-2"
            onClick={() => handleDelete(record.id)}
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
              state={record}
            >
              Edit
            </Link>
          </button>
        </div>
      ),
    },
  ];

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
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <Table
        className="my-5"
        columns={columns}
        dataSource={usersData}
        loading={loading}
        pagination={{
          pageSize: 10,
          total: totalUsers,
        }}
        // onChange={(page, Pagesize) => {
        //   let skip = (page - 1) * Pagesize;
        //   dispatch(loadUsers(skip, Pagesize));
        // }}
      />
    </div>
  );
};

export default Home;
