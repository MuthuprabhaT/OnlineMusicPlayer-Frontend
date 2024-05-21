import { useFormik } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetError, ShowLoading } from "../redux/alerts-slice";

const Register = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.alerts);

  const navigate = useNavigate();

  const validation = yup.object({
    username: yup
      .string()
      .required("Name is required")
      .max(15, "Max length is 15 chars")
      .min(3, "Min length is 3 chars"),
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password start with capital letter then from 5 to 10 letters or digits"
      ),
  });

  const sendDataToRegister = async (values) => {
    try {
      dispatch(ShowLoading());

      let response = await axios.post(
        // `http://localhost:5000/api/user/signup`,
        `https://onlinemusicplayer-backend.onrender.com/api/user/signup`,
        values
      );

      dispatch(HideLoading());

      if (response.data.success) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        navigate("/login");
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
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendDataToRegister,
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-md-6 col-sm 12">
          <div className="card bg-dark">
            <div className="card-body">
              <h3 className="card-title fw-bold fs-5 my-3 text-white text-center">
                Sign Up{" "}
              </h3>
              <form className="text-white" onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger">{error}</p> : ""}

                <div className="mb-2">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="form-control mt-3"
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.username && formik.touched.username ? (
                  <p className="fs-small ps-1 fw-bold text-danger text-start">
                    {formik.errors.username}
                  </p>
                ) : (
                  ""
                )}

                <div className="mb-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control mt-3"
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

                <div className="mb-2">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password-input"
                    type="password"
                    placeholder="Enter password"
                    className="form-control mt-3"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.errors.password && formik.touched.password ? (
                  <p className="fs-small ps-1 fw-bold text-danger text-start">
                    {formik.errors.password}
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
                      "Sign up"
                    )}
                  </button>
                </div>

                <p className="text-end mt-4">
                  Have an account?{" "}
                  <Link to="/login" className="text-decoration-none">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
