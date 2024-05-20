import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { playTrack } from "../redux/playerSlice";

const PlayListItem = () => {
  const dispatch = useDispatch();
  const { selectedPlaylist, allSongs, currentTrack } = useSelector(
    (state) => state.player
  );

  const handlePlay = (song, index) => {
    dispatch(playTrack({ song, index }));
  };

  return (
    <div className="row row-cols-1 row-cols-md-3 row-cols-xl-4">
      {selectedPlaylist[0].songs.map((playListItem, index) => {
        return (
          <div key={index} className="col mb-5">
            <div
              className="card bg-dark text-white h-100"
              onClick={() => handlePlay(playListItem, index)}
            >
              <img
                src={playListItem?.imageUrl}
                className="card-img-top"
                alt={playListItem?.title}
              />
              <div className="card-body">
                <h5 className="card-title">{playListItem?.title}</h5>
                <span>
                  <p className="card-text">{playListItem?.artist}</p>
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PlayListItem;
