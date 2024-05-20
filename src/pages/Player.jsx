import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IoVolumeMute,
  IoVolumeHigh,
  IoPlayBackCircle,
  IoPlayForwardCircle,
  IoPlayCircle,
  IoPauseCircle,
} from "react-icons/io5";
import "../styles/Player.css";
import {
  nextTrack,
  prevTrack,
  setDuration,
  setPlaying,
  setVolume,
  updateTime,
} from "../redux/playerSlice";

const Player = () => {
  const dispatch = useDispatch();
  const audioRef = useRef();

  const {
    currentTrack,
    isPlaying,
    currentIndex,

    allSongs,
    currentTime,
    duration,
    currentVolume,
  } = useSelector((state) => state.player);

  const [audioPlaying, setAudioPlaying] = useState(
    audioRef.current && audioRef.current.playing
  );

  useEffect(() => {
    if (audioPlaying) {
      dispatch(setPlaying(true));
    } else {
      dispatch(setPlaying(false));
    }
  }, [audioPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  const handlePlayPause = () => {
    const index = allSongs.findIndex((s) => s.title === currentTrack.title);
    console.log("player index:", index);
    console.log("player currentindex", currentIndex);
    console.log("playpasue allsongs", allSongs);
    if (isPlaying) {
      audioRef?.current.pause();
      dispatch(setPlaying(false));

      console.log("audioreftimes:", audioRef.current);
    } else {
      audioRef?.current.play();
      dispatch(setPlaying(true));
    }
  };

  const handleSeek = (e) => {
    audioRef.current.currentTime = e.target.value;
    dispatch(updateTime(e.target.value));
  };

  useEffect(() => {
    audioRef.current.currentTime = 0;
    audioRef?.current.play();
  }, [currentTrack?.songUrl]);

  const handleNextSong = () => {
    const index = allSongs.findIndex((s) => s.title === currentTrack.title);

    dispatch(nextTrack(allSongs[index + 1]));
  };

  const handlePreviousSong = () => {
    const index = allSongs.findIndex((s) => s.title === currentTrack.title);

    dispatch(prevTrack(allSongs[index - 1]));
  };

  const handleTimeUpdate = () => {
    dispatch(updateTime(audioRef.current.currentTime));
    if (audioRef.current.duration) {
      dispatch(setDuration(audioRef.current.duration));
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleVolumeChange = (e) => {
    audioRef.current.volume = e.target.value;
    dispatch(setVolume(e.target.value));
  };

  const handleMuteVolume = () => {
    audioRef.current.volume = 0;
    dispatch(setVolume(0));
  };

  const handleHighVolume = () => {
    audioRef.current.volume = 1;
    dispatch(setVolume(1));
  };
  return (
    <div className="audio-player d-flex justify-content-between align-items-center p-3">
      <div className="song-info d-none d-md-flex align-items-center">
        <img
          src={currentTrack?.imageUrl}
          alt={currentTrack?.title}
          className="song-image rounded"
        />
        <div className="ml-3">
          <h6 className="mb-0">{currentTrack?.title}</h6>
          <p className="mb-0">{currentTrack?.artist}</p>
        </div>
      </div>

      <div className="text-danger d-flex justify-content-center">
        {formatTime(currentTime)}/{formatTime(duration)}
      </div>

      <input
        type="range"
        min="0"
        max={duration}
        value={currentTime}
        onChange={handleSeek}
        className="song-seek-slider position-absolute w-100"
      />

      <div className="controls d-flex justify-content-center text-dark align-items-center">
        <button className="btn btn-dark btn-link" onClick={handlePreviousSong}>
          <IoPlayBackCircle className="fs-5 text-white" />
        </button>
        <button className="btn btn-dark btn-link" onClick={handlePlayPause}>
          {isPlaying ? (
            <IoPauseCircle className="fs-4 text-white" />
          ) : (
            <IoPlayCircle className="fs-3 text-white" />
          )}
        </button>
        <button className="btn btn-dark btn-link" onClick={handleNextSong}>
          <IoPlayForwardCircle className="fs-5 text-white" />
        </button>
      </div>

      <div className="song-info text-white d-flex d-md-none align-items-center">
        <div className="mr-3">
          <h6 className="mb-0">{currentTrack?.title}</h6>
          <p className="mb-0">{currentTrack?.artist}</p>
        </div>
      </div>

      <div className="volume-control d-none d-md-flex align-items-center">
        <IoVolumeMute className="fs-5 text-white" onClick={handleMuteVolume} />
        <input
          type="range"
          className="form-control-range ml-2"
          min="0"
          max="1"
          step="0.01"
          value={currentVolume}
          onChange={handleVolumeChange}
        />
        <IoVolumeHigh className="fs-5 text-white" onClick={handleHighVolume} />
      </div>

      <audio
        ref={audioRef}
        src={currentTrack?.songUrl}
        onTimeUpdate={handleTimeUpdate}
      />
    </div>
  );
};

export default Player;
