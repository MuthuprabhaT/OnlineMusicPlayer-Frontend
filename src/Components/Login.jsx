import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetError, ShowLoading } from "../redux/alerts-slice";
import { SetIsAuthenticated } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.alerts);

  const navigate = useNavigate();

  const validation = yup.object({
    email: yup
      .string()
      .required("Email is required")
      .email("Email is not valid"),
    password: yup.string().required("Password is required"),
  });

  const sendDataToLogin = async (values) => {
    try {
      dispatch(ShowLoading());

      let response = await axios.post(
        // `http://localhost:5000/api/user/login`,
        `https://onlinemusicplayer-backend.onrender.com/api/user/login`,
        values
      );

      dispatch(SetIsAuthenticated(true));

      dispatch(HideLoading());

      if (response.data.success) {
        localStorage.setItem("Auth Token", `${response?.data?.authToken}`);
        localStorage.setItem("userName", `${response?.data?.userName}`);

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
        navigate("/");
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
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendDataToLogin,
  });

  return (
    <div className="container mt-5 ">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-md-6 col-sm 12">
          <div className="card bg-dark">
            <div className="card-body">
              <h3 className="card-title fw-bold fs-5 my-3 text-white text-center">
                Log in to your account
              </h3>
              <form className="text-white" onSubmit={formik.handleSubmit}>
                {error ? <p className="text-danger">{error}</p> : ""}

                <div>
                  <label htmlFor="email" className="my-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control mt-2"
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

                <div className="my-1">
                  <label htmlFor="password">Password</label>
                  <input
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
                      "Log in"
                    )}
                  </button>

                  <p className=" mt-3 text-center">
                    <Link to="/forgotPassword" className="text-decoration-none">
                      Forgot your password?
                    </Link>
                  </p>
                </div>

                <p className="text-end mt-2">
                  Don't have an account?{" "}
                  <Link to="/register" className="text-decoration-none">
                    Sign up
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

export default Login;
