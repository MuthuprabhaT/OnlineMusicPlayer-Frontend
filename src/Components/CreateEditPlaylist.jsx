import React, { useState } from "react";
import { IoHeartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShowLoading, HideLoading } from "../redux/alerts-slice";
import { toast } from "react-toastify";
import { SetUser } from "../redux/playerSlice";

const CreateEditPlaylist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [playlistName, setPlaylistName] = useState("");
  const [selectedSongs, setSelectedSongs] = useState([]);

  const { allSongs } = useSelector((state) => state.player);

  const selectUnselectSong = (song) => {
    if (selectedSongs.find((s) => s._id === song._id)) {
      setSelectedSongs(selectedSongs.filter((s) => s._id !== song._id));
    } else {
      setSelectedSongs([...selectedSongs, song]);
    }
  };

  const onAdd = async () => {
    if (playlistName.trim().length === 0 || selectedSongs.length === 0) {
      toast.error("Please fill all fields");
    } else {
      try {
        dispatch(ShowLoading());
        const response = await axios.post(
          // "http://localhost:5000/api/songs/create-playlist",
          "https://onlinemusicplayer-backend.onrender.com/api/songs/create-playlist",
          {
            playlistName,
            songs: selectedSongs,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Auth Token")}`,
            },
          }
        );

        dispatch(HideLoading());

        if (response.data.success) {
          toast.success("Playlist created successfully");

          dispatch(SetUser(response.data.data));
          setPlaylistName("");
          setSelectedSongs([]);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div>
      <form className="mt-4">
        <div className="row d-flex  g-3">
          <div className="col-xl-6 col-md-6 col-sm-6">
            <label className="form-label h4 ">Playlist Name</label>
            <input
              type="text"
              className="form-control"
              value={playlistName}
              onChange={(e) => {
                setPlaylistName(e.target.value);
              }}
            />
          </div>
        </div>
      </form>

      <span className="d-flex justify-content-end">
        <button className="btn btn-primary px-4 py-2" onClick={onAdd}>
          Save
        </button>
      </span>

      <h3 className="my-4">Selected Songs - {selectedSongs.length}</h3>

      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
        {allSongs.map((song, index) => {
          const isSelected = selectedSongs.find((s) => s._id === song._id);
          return (
            <div key={index} className="col mb-5">
              <div
                className={`card bg-dark text-white h-100 border-5 ${
                  isSelected ? "border-info" : " "
                }`}
                onClick={() => selectUnselectSong(song)}
              >
                <img src={song?.imageUrl} className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">{song?.title}</h5>
                  <span>
                    <p className="card-text">{song?.artist}</p>
                  </span>
                  <span className="d-flex justify-content-end">
                    <IoHeartOutline />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateEditPlaylist;
