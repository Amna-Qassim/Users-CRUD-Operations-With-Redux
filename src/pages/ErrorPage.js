import React from "react";
import errorImage from "../images/error-404-page2.webp";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-5 d-flex justify-content-center align-items-center flex-column">
      <div>
        <img src={errorImage} alt="404_image_page" />
      </div>
      <h2 style={{ color: "#dc858c" }}>Something wrong go back to home page</h2>
      <button className="btn btn-dark" onClick={() => navigate("/users")}>
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
