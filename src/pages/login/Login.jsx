import { useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLoading } from "../../redux/actions/actions";
import { Spin } from "antd";
import axios from "axios";
import * as Yup from "yup";
import "./loginStyle.css";

// Creating schema
const schema = Yup.object().shape({
  username: Yup.string()
    .matches(/^07[3-9]\d{8}$/, "must be like this 07xxxxxxxxx")
    .required("UserName is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const [error, setError] = useState("");
  const { loading } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const TOKEN_KEY = "token";
  console.log(loading);

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        autocomplete="off"
        validationSchema={schema}
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          dispatch(handleLoading());
          axios
            .post("https://mes-backend.herokuapp.com/users/login", values)
            .then((response) => {
              console.log(response);
              let token = response.data.accessToken;
              //i convert the data from object to string before i set it in localStorage
              localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
              navigate("/users");
            })
            .catch((error) => {
              console.log(error);
              setError(error);
            });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            {}
            <div className="form">
              {/* Passing handleSubmit parameter to html form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Users Login</span>
                {error && (
                  <h6 style={{ color: "red" }}>
                    {error.code} <br /> make sure you enter correct userName and
                    password!
                  </h6>
                )}
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="Enter phoneNumber"
                  className="form-control inp_text"
                  id="userName"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.username && touched.username && errors.username}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit">
                  <div className="d-flex justify-content-center">
                    Login
                    {loading && (
                      <Spin className="mx-2 mt-1 ant-spin" size="small" />
                    )}
                  </div>
                </button>
              </form>
            </div>
            )
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
