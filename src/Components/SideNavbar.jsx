import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoHomeSharp, IoMusicalNotes } from "react-icons/io5";
import { TiThLarge } from "react-icons/ti";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Player from "../pages/Player";
import { useDispatch, useSelector } from "react-redux";
import { SetIsAuthenticated } from "../redux/authSlice";
import { setPlaying } from "../redux/playerSlice";

const SideNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("Auth Token");
    localStorage.removeItem("userName");
    dispatch(SetIsAuthenticated(false));
    dispatch(setPlaying(false));

    navigate("/login");
  };

  return (
    <>
      {isAuthenticated && (
        <div>
          <div
            className="d-flex flex-column flex-shrink-0 p-3 bg-dark text-dark"
            id="sidebar"
          >
            <Link
              to={"/"}
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto  text-decoration-none"
            >
              <span>
                <IoMusicalNotes className="fs-2 text-light" />
              </span>
              <span className="fs-4 d-none d-sm-inline text-light">
                Beat Flow
              </span>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link " aria-current="page">
                  <IoHomeSharp className="fs-2 text-light" />
                  <span className="ms-2 d-none d-sm-inline text-light">
                    Home
                  </span>
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  to={"/playlist"}
                  className="nav-link "
                  aria-current="page"
                >
                  <TiThLarge className="fs-2 text-light" />
                  <span className="ms-2 d-none d-sm-inline text-light">
                    Playlist
                  </span>
                </Link>
              </li>
            </ul>

            <button
              className="text-decoration-none btn btn-secondary d-flex align-items-end"
              onClick={handleLogout}
            >
              <RiLogoutCircleRLine className="fs-3 text-dark" />
              <span className=" d-none fs-4 ms-2 d-sm-inline text-dark">
                Logout
              </span>
            </button>
          </div>

          <Player />
        </div>
      )}
    </>
  );
};

export default SideNavbar;
