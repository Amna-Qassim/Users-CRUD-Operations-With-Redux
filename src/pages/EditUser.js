import { React } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/actions/actions";

// Creating schema
const schema = Yup.object().shape({
  username: Yup.string().matches(
    /^07[3-9]\d{8}$/,
    "must be like this 07xxxxxxxxx"
  ),
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "must be letters")
    .min(2, "To short")
    .max(10, "To long"),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+$/, "must be letters")
    .min(2, "To short")
    .max(10, "To long"),
  role: Yup.string(),
  isActive: Yup.boolean(),
});

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.data);
  const location = useLocation();
  const data = location.state;
  const { username, firstName, lastName, password, isActive, id } = data;
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        autocomplete="off"
        validationSchema={schema}
        initialValues={{
          username: username,
          firstName: firstName,
          lastName: lastName,
          password: password,
          role: "ADMIN",
          isActive: isActive,
        }}
        onSubmit={(values) => {
          dispatch(updateUser(values, id));
          navigate("/users");
          console.log(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="mx-auto w-50 mt-4">
            {error ? (
              <h1>{error.response.data}</h1>
            ) : (
              <>
                <button
                  className="btn btn-light"
                  onClick={() => navigate("/users")}
                >
                  Go back
                </button>
                <h2 className="text-center mb-3">Edit User</h2>
                {console.log("data", data)}
                <form noValidate onSubmit={handleSubmit}>
                  {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                  <label
                    style={{
                      color: "#636363",
                      fontWeight: "bold",
                      fontSize: "16px",
                      margin: "3px 0",
                    }}
                  >
                    UserName:
                  </label>
                  <input
                    type="text"
                    name="username"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.username}
                    placeholder="Enter Your phoneNumber"
                    className="form-control inp_text"
                    id="username"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-danger">
                    {errors.username && touched.username && errors.username}
                  </p>
                  <label
                    style={{
                      color: "#636363",
                      fontWeight: "bold",
                      fontSize: "16px",
                      margin: "3px 0",
                    }}
                  >
                    First Name:
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                    placeholder="Enter your firstName"
                    className="form-control inp_text"
                    id="firstName"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-danger">
                    {errors.firstName && touched.firstName && errors.firstName}
                  </p>
                  <label
                    style={{
                      color: "#636363",
                      fontWeight: "bold",
                      fontSize: "16px",
                      margin: "3px 0",
                    }}
                  >
                    Last Name:
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                    placeholder="Enter your lastName"
                    className="form-control inp_text"
                    id="lastName"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-danger">
                    {errors.lastName && touched.lastName && errors.lastName}
                  </p>
                  {/* isActive input */}
                  <div className="my-2">
                    <input
                      type="checkbox"
                      name="isActive"
                      value={values.isActive}
                      onChange={handleChange}
                      defaultChecked={isActive}
                    />{" "}
                    <span>Active your Admin role</span>
                  </div>
                  {/* Click on submit button to submit the form */}
                  <div className=" d-flex justify-content-center">
                    <button type="submit" className="btn btn-dark">
                      Update
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </Formik>
    </>
  );
};

export default EditUser;
