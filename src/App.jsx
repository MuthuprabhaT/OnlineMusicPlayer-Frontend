import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./Components/Register";
import Login from "./Components/Login";
import ForgotPassword from "./Components/ForgotPassword";
import VerifyRandomString from "./Components/VerifyRandomString";
import ResetPassword from "./Components/ResetPassword";
import SideNavbar from "./Components/SideNavbar";
import HomePage from "./pages/HomePage";
import SongCard from "./Components/SongCard";
import PlayLists from "./pages/PlayLists";
import Player from "./pages/Player";
import PlayListItem from "./Components/PlayListItem";
import CreateEditPlaylist from "./Components/CreateEditPlaylist";
import { useSelector } from "react-redux";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <div className="d-flex">
        <SideNavbar />
        <div className="flex-grow-1 overflow-auto" id="main-content">
          <Routes>
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  isAuthenticated ? (
                    <HomePage />
                  ) : (
                    <Login />
                  )
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={!isAuthenticated && <Register />}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/forgotPassword"
              element={!isAuthenticated && <ForgotPassword />}
            />
            <Route
              path="/verifyRandomString/:randomString"
              element={!isAuthenticated && <VerifyRandomString />}
            />
            <Route
              path="/resetPassword/:randomString"
              element={!isAuthenticated && <ResetPassword />}
            />

            <Route
              path="/playList"
              element={isAuthenticated ? <PlayLists /> : <Login />}
            />

            <Route
              path="/song-card"
              element={isAuthenticated ? <SongCard /> : <Login />}
            />
            <Route
              path="/player"
              element={isAuthenticated ? <Player /> : <Login />}
            />
            <Route
              path="/playListItem"
              element={isAuthenticated ? <PlayListItem /> : <Login />}
            />
            <Route
              path="/createEditPlaylist"
              element={isAuthenticated ? <CreateEditPlaylist /> : <Login />}
            />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </Router>
  );
}

// function App() {
//   return (
//     <Router>
//       <SideNavbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/logout" element={<Logout />} />
//         <Route path="/forgotPassword" element={<ForgotPassword />} />
//         <Route
//           path="/verifyRandomString/:randomString"
//           element={<VerifyRandomString />}
//         />
//         <Route
//           path="/resetPassword/:randomString"
//           element={<ResetPassword />}
//         />
//         <Route path="/browse" element={<BrowsePage />} />
//         <Route path="/playlist" element={<PlaylistPage />} />
//         <Route path="/favorites" element={<FovoritesPage />} />
//       </Routes>
//     </Router>
//   );
// }

export default App;
