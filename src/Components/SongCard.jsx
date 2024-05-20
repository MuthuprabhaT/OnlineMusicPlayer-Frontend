import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playTrack } from "../redux/playerSlice";

const SongCard = ({ song, index }) => {
  const dispatch = useDispatch();

  const playSong = () => {
    dispatch(playTrack({ song, index }));
  };

  return (
    <div className="col mb-5">
      <div onClick={playSong} className="card bg-dark text-white h-100">
        <img src={song.imageUrl} className="card-img-top" alt={song.title} />
        <div className="card-body">
          <h5 className="card-title">{song.title}</h5>
          <span>
            <p className="card-text">{song.artist}</p>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
