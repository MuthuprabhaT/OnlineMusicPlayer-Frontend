import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyRandomString = () => {
  const [verificationStatus, setVerificationStatus] = useState("Verifying...");

  const navigate = useNavigate();
  const { randomString } = useParams();

  useEffect(() => {
    async function VerifyRandomString() {
      try {
        const response = await axios.get(
          // `http://localhost:5000/api/user/verifyRandomString/${randomString}`
          `https://onlinemusicplayer-backend.onrender.com/api/user/verifyRandomString/${randomString}`
        );

        if (response.data.message === "Random String Verified") {
          toast.success("Random String Verified Successfully", {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          setVerificationStatus("Random String Verified");
        } else {
          setVerificationStatus("Random String Verification Failed");
          toast.error("Random String Verification Failed", {
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
        setVerificationStatus("Random String is Invalid or Expires");
        toast.error("Random String is Invalid or Expires", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.error(error);
      }
    }

    if (randomString) {
      VerifyRandomString();
    }
  }, [randomString]);

  const handleContinueClick = () => {
    navigate(`/resetPassword/${randomString}`);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center ">
        <div className="col-xl-5 col-md-6 col-sm 12">
          <div className="card bg-dark">
            <div className="card-body">
              <h2 className="card-title">Verify Random String</h2>

              <p className="mt-3">{verificationStatus}</p>
              {verificationStatus === "Random String Verified" && (
                <button
                  className="btn-primary p-3 rounded-5 text-center mt-3 w-100"
                  onClick={handleContinueClick}
                >
                  Continue to Reset Password
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyRandomString;
