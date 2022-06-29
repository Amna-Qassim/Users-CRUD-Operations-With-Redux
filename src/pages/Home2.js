import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUsers, deleteUser, handleLoading } from "../redux/actions/actions";
import { useNavigate, Link } from "react-router-dom";
import { Table } from "antd";

const Home = () => {
  let dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.data);
  const usersData = users.results;
  const totalUsers = users.count;
  const page_size = 10;
  const navigate = useNavigate();
  console.log(loading);
  console.log("error", error);

  useEffect(() => {
    dispatch(handleLoading());
    dispatch(loadUsers());
  }, [dispatch]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "UserName",
      dataIndex: "username",
      key: "userName",
    },
    {
      title: "isActive",
      key: "isActive",
      dataIndex: "role",
      render: (_, record) => (
        <>
          {record.isActive ? (
            <span style={{ color: "red" }}>Active</span>
          ) : (
            <span style={{ color: "#059fbd" }}>Not Active</span>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => {
        if (record.role === "ADMIN") {
          return (
            <div className="d-flex justify-content-start">
              <button
                type="button"
                className="btn btn-danger me-2"
                onClick={() => handleDelete(record.id)}
              >
                Delete
              </button>{" "}
              <button type="button" className="btn btn-info">
                <Link
                  className=""
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
          );
        }
      },
    },
  ];
  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the user?")) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <div className="container">
      {error ? (
        <h1 className="text-center text-danger">
          Error: {error.response.data}
        </h1>
      ) : (
        <>
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
                className="btn btn-secondary me-3"
                onClick={() => navigate("/balance")}
              >
                Go To Balance
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
              pageSize: page_size,
              total: totalUsers,
              position: ["bottomCenter"],
            }}
            onChange={(page) => {
              let skip = (page.current - 1) * page.pageSize;
              dispatch(loadUsers(skip, page.pageSize));
            }}
          />
        </>
      )}
    </div>
  );
};

export default Home;
