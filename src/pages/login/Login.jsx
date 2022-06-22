import { React, useState } from "react";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import "./loginStyle.css";

// Creating schema
const schema = Yup.object().shape({
  userName: Yup.string()
    .matches(/^[0-9]{11}$/, "must be like this 07700000000")
    .required("UserName is a required field"),
  password: Yup.string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters"),
});

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const TOKEN_KEY = "token";

  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        autocomplete="off"
        validationSchema={schema}
        initialValues={{ userName: "", password: "" }}
        onSubmit={(values) => {
          setUserName(values.userName);
          setPassword(values.password);
          //short hand way to write request by axios
          axios
            .post("https://mes-backend.herokuapp.com/users/login", {
              username: username,
              password: password,
            })
            .then((response) => {
              console.log(response);
              let token = response.data.accessToken;
              //i convert the data from object to string before i set it in localStorage
              localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
              navigate("/users");
            })
            .catch((error) => {
              console.log(error);
            });
          // // Alert the input values of the form that we filled
          // alert(JSON.stringify(values));
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
            <div className="form">
              {/* Passing handleSubmit parameter to html form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <span>Users Login</span>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="text"
                  name="userName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.userName}
                  placeholder="Enter phoneNumber"
                  className="form-control inp_text"
                  id="userName"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.userName && touched.userName && errors.userName}
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
                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default Login;
