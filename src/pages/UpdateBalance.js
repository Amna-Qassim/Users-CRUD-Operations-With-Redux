import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBalance, loadBalance } from "../redux/actions/actions";
import BalanceCard from "../Components/BalanceCard";

// Creating schema
const schema = Yup.object().shape({
  iqdBalance: Yup.string().required("Iraqi balance is a required field"),
  usdBalance: Yup.string().required("USD balance is a required field"),
});

const UpdateBalance = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, balance } = useSelector((state) => state.data);
  const balanceData = balance.results;

  const getBalance = () => {
    dispatch(loadBalance());
  };

  return (
    <>
      <div className="d-flex justify-content-start mx-5 my-3">
        <button className="btn btn-light" onClick={() => navigate("/users")}>
          Go back
        </button>
      </div>
      <BalanceCard />
      <h2 className="text-center my-4">Update Your Balance</h2>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        autocomplete="off"
        validationSchema={schema}
        initialValues={{
          iqdBalance: balance.iqdBalance,
          usdBalance: balance.usdBalance,
        }}
        onSubmit={(values) => {
          dispatch(updateBalance(values)) && getBalance();
          console.log("val", values);
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
          <div className="mx-auto w-50 mt-4">
            {error ? (
              <h1>{error.response.data}</h1>
            ) : (
              <>
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
                    Iraqi Balance:
                  </label>
                  <input
                    type="text"
                    name="iqdBalance"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.iqdBalance}
                    placeholder="Enter Your iqdBalance"
                    className="form-control inp_text"
                    id="iqdBalance"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-danger">
                    {errors.iqdBalance &&
                      touched.iqdBalance &&
                      errors.iqdBalance}
                  </p>
                  <label
                    style={{
                      color: "#636363",
                      fontWeight: "bold",
                      fontSize: "16px",
                      margin: "3px 0",
                    }}
                  >
                    USD Balance:
                  </label>
                  <input
                    type="text"
                    name="usdBalance"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.usdBalance}
                    placeholder="Enter your usdBalance"
                    className="form-control inp_text"
                    id="usdBalance"
                  />
                  {/* If validation is not passed show errors */}
                  <p className="text-danger">
                    {errors.usdBalance &&
                      touched.usdBalance &&
                      errors.usdBalance}
                  </p>

                  {/* Click on submit button to submit the form */}
                  <div className=" d-flex justify-content-center">
                    <button type="submit" className="btn btn-dark">
                      Add
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

export default UpdateBalance;
