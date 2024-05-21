import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetError, ShowLoading } from "../redux/alerts-slice";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.alerts);

  const validation = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
  });

  const sendDataToMail = async (values) => {
    console.log("Clicked");
    try {
      dispatch(ShowLoading());
      console.log("VAlues:", values);
      let response = await axios.post(
        // `http://localhost:5000/api/user/forgotPassword`,
        `https://onlinemusicplayer-backend.onrender.com/api/user/forgotPassword`,
        values
      );

      console.log("Response:", response);
      dispatch(HideLoading());

      if (response.data.success) {
        toast.success("Password reset link sent to your email", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.log("Else Error:", response.data);
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.log("Error response:", error.response.data);
      console.log("Error:", error.response.data.message);
      dispatch(SetError(error.response.data.message));
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      dispatch(HideLoading());
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validation,
    onSubmit: sendDataToMail,
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-md-6 col-sm 12">
          <div className="card bg-dark">
            <div className="card-body">
              <h4 className="card-title fw-bold fs-5 my-3 text-white text-center">
                Trouble with logging in?
              </h4>
              <h5 className="text-secondary mt-4">
                <em>
                  {" "}
                  Enter your email address and we'll send you a link to get back
                  into your account.
                </em>
              </h5>
              <form className="text-white mt-3" onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger">{error}</p> : ""}
                <div>
                  <label htmlFor="email" className="my-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control "
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.email && formik.touched.email ? (
                  <p className="fs-small ps-1 fw-bold text-danger text-start">
                    {formik.errors.email}
                  </p>
                ) : (
                  ""
                )}
                <div className="d-grid mt-4">
                  <button type="submit" className="btn btn-primary">
                    {loading ? (
                      <div className="d-flex justify-content-center">
                        <Oval
                          height={30}
                          width={30}
                          color="#fff"
                          wrapperStyle={{}}
                          wrapperClass=""
                          visible={true}
                          ariaLabel="oval-loading"
                          secondaryColor="#86b7fe"
                          strokeWidth={2}
                          strokeWidthSecondary={2}
                        />
                      </div>
                    ) : (
                      "Send login link"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
