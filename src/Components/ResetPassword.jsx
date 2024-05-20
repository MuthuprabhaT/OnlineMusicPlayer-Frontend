import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { Oval } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetError, ShowLoading } from "../redux/alerts-slice";

const ResetPassword = () => {
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.alerts);

  const navigate = useNavigate();
  const { randomString } = useParams();

  const validation = yup.object({
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password start with capital letter then from 5 to 10 letters or digits"
      ),
  });

  const sendUpdatedData = async (values) => {
    try {
      dispatch(ShowLoading());

      let response = await axios.post(
        // `http://localhost:5000/api/user/resetPassword/${randomString}`,
        `https://onlinemusicplayer-backend.onrender.com/api/user/resetPassword/${randomString}`,
        values
      );

      console.log("Response:", response);
      dispatch(HideLoading());
      console.log("navigate outside if", response);

      if (response.data.success) {
        console.log("Inside if loop", response);
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
        console.log("navigate");
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
      password: "",
    },
    validationSchema: validation,
    onSubmit: sendUpdatedData,
  });

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-xl-5 col-md-6 col-sm 12">
          <div className="card bg-dark">
            <div className="card-body">
              <h2 className="card-title">Reset Password</h2>
              <form onSubmit={formik.handleSubmit}>
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

                {error ? <p className="fw-bold text-danger">{error}</p> : ""}
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
                      "Update Password"
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

export default ResetPassword;
