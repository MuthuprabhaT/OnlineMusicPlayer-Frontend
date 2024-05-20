import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  currentTrack: null,
  isPlaying: false,
  currentIndex: 0,
  trackList: [],
  allSongs: [],
  selectedPlaylist: [],
  currentTime: 0,
  duration: 0,
  currentVolume: 1,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
    playTrack: (state, action) => {
      state.currentTrack = action.payload.song;
      state.currentIndex = action.payload.index;
      state.isPlaying = true;
    },
    setTrackList: (state, action) => {
      state.trackList = action.payload.list;
      state.currentIndex = action.payload.index ? action.payload.index : 0;
    },
    nextTrack: (state, action) => {
      if (state.currentIndex >= state.allSongs.length - 1) {
        state.currentTrack = state.allSongs[0];
        state.currentIndex = 0;
      } else {
        state.currentTrack = action.payload;
        state.currentIndex += 1;
        state.isPlaying = true;
      }
    },
    setCurrentIndex: (state, action) => {
      state.currentIndex = action.payload + 1;
    },
    prevTrack: (state, action) => {
      if (state.currentIndex <= 0) {
        state.currentTrack = state.allSongs[state.allSongs.length - 1];
        state.currentIndex = state.allSongs.length;
      } else {
        state.currentTrack = action.payload;
        state.currentIndex -= 1;
        state.isPlaying = true;
      }
    },
    SetUser: (state, action) => {
      state.user = action.payload;
    },
    SetAllSongs: (state, action) => {
      state.allSongs = action.payload;
    },
    SetSelectedPlaylist: (state, action) => {
      state.selectedPlaylist = action.payload;
    },
    updateTime: (state, action) => {
      state.currentTime = action.payload;
    },
    setDuration: (state, action) => {
      state.duration = action.payload;
    },
    setVolume: (state, action) => {
      state.currentVolume = action.payload;
    },
  },
});

export const {
  setCurrentTrack,
  setPlaying,
  playTrack,
  setTrackList,
  nextTrack,
  prevTrack,
  SetUser,
  SetAllSongs,
  SetSelectedPlaylist,

  setCurrentIndex,
  updateTime,
  setDuration,
  setVolume,
} = playerSlice.actions;

export default playerSlice.reducer;
