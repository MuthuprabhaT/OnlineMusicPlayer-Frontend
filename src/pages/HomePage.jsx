import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, SetError, ShowLoading } from "../redux/alerts-slice";
import axios from "axios";
import SongCard from "../Components/SongCard";
import { SetAllSongs, SetUser } from "../redux/playerSlice";

const HomePage = () => {
  const dispatch = useDispatch();

  const { allSongs } = useSelector((state) => state.player);

  const fetchedSongs = async () => {
    try {
      dispatch(ShowLoading());
      let response = await axios.get(
        // `http://localhost:5000/api/songs/get-all-songs`
        `https://onlinemusicplayer-backend.onrender.com/api/songs/get-all-songs`
      );

      dispatch(SetAllSongs(response.data.data));

      dispatch(HideLoading());
    } catch (error) {
      dispatch(SetError(error.response.data.message));
      dispatch(HideLoading());
    }
  };

  const fetchPlaylists = async () => {
    try {
      const response = await axios.get(
        // "http://localhost:5000/api/songs/get-playlists"
        "https://onlinemusicplayer-backend.onrender.com/api/songs/get-playlists"
      );

      const loggedInUser = localStorage.getItem("userName");
      const userPlaylist = response.data.data.filter(
        (item) => item.username === loggedInUser
      );
      dispatch(SetUser([userPlaylist]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchedSongs();
    fetchPlaylists();
  }, []);

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
        {allSongs.map((song, index) => (
          <SongCard key={song._id} index={index} song={song} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
