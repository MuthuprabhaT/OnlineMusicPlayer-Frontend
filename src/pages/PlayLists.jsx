import React, { useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SetAllSongs,
  SetSelectedPlaylist,
  SetUser,
} from "../redux/playerSlice";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { HideLoading, ShowLoading } from "../redux/alerts-slice";

const PlayLists = () => {
  const navigate = useNavigate();

  const { user, allSongs, selectedPlaylist } = useSelector(
    (state) => state.player
  );

  const dispatch = useDispatch();

  const allPlaylists = [
    {
      name: "All Songs",
      songs: allSongs,
    },
    ...user[0][0].playlists,
  ];

  useEffect(() => {
    if (!selectedPlaylist && allSongs.length > 0) {
      dispatch(SetSelectedPlaylist(allSongs[0]));
    }
  }, [selectedPlaylist, allSongs]);

  const onDelete = async (name) => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(
        // "http://localhost:5000/api/songs/delete-playlist",
        "https://onlinemusicplayer-backend.onrender.com/api/songs/delete-playlist",
        { name },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Auth Token")}`,
          },
        }
      );

      dispatch(HideLoading());

      if (response.data.success) {
        toast.success("Playlist Deleted successfully");

        dispatch(SetUser(response.data.data));

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    const allSongs = allPlaylists.filter(
      (playlist) => playlist?.name === "All Songs"
    );

    dispatch(SetSelectedPlaylist(allSongs[0]));
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
        <div className="col">
          <div
            className="card h-100 cursor-pointer"
            onClick={() => {
              navigate("/createEditPlaylist");
            }}
          >
            <div className="card-body cursor-pointer">
              <h5 className="card-title">
                <FaPlus className="cursor-pointer" />
              </h5>
              <p className="card-text">Create Playlist</p>
            </div>
          </div>
        </div>
        {allPlaylists.map((playlist, index) => {
          return (
            <div
              key={index}
              className="col"
              onClick={() => {
                dispatch(SetSelectedPlaylist([playlist]));
                dispatch(SetAllSongs(playlist.songs));

                navigate("/playListItem");
              }}
            >
              <div className="card h-100 cursor-pointer">
                <div className="card-body cursor-pointer">
                  <h5 className="card-title">{playlist?.name}</h5>
                  <p className="card-text">{playlist?.songs?.length} songs</p>
                  <FaTrashAlt
                    className="text-2xl fs-5 text-danger cursor-pointer text-red-600"
                    onClick={() => {
                      onDelete(playlist.name);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlayLists;
