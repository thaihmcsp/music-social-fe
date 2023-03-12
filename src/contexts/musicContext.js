import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { musicReducer } from "../reducers/musicReducer";
import {
  api,
  apiUrl,
  DELETE_MUSIC,
  MUSICS_LOADED_FAIL,
  MUSICS_LOADED_SUCCESS,
  MUSIC_CLICK,
  MUSIC_CLICK_FAVORITE,
  MUSIC_CLICK_HOME,
  MUSIC_CLICK_NEXT,
  MUSIC_CLICK_PRE,
} from "./constants";
import { statemusic } from "../reducers/musicReducer";
import { PostContext } from "./postContext";

export const MusicContext = createContext();

const MusicContextProvider = ({ children }) => {
  // State
  const [musicState, dispatch] = useReducer(musicReducer, statemusic);

  // Get all posts
  const getMusics = async () => {
    try {
      const response = await axios.get(`${apiUrl}/music`);
      if (response.data.success) {
        dispatch({
          type: MUSICS_LOADED_SUCCESS,
          payload: response.data.musics,
        });
      }
    } catch (error) {
      dispatch({ type: MUSICS_LOADED_FAIL });
    }
  };

  // Find id music when user is updating post
  const findIDMusic = (musicId) => {
    const music = musicState.musics.find((music) => music._id === musicId);
    dispatch({ type: MUSIC_CLICK, payload: music });
  };

  useEffect(() => getMusics(), []);
  // Find id music when user click play music at home page
  const getIdMusicHome = (musicIdHome) => {
    const musicGet = musicState.musics.find((music) => music._id === musicIdHome);
    dispatch({
      type: MUSIC_CLICK_HOME,
      payload: musicGet,
    });
  };
  // Tìm ra bài hát kế tiếp (Bài hát kế tiếp so với bài hát hiện tại)
  const getIdMusicNext = (musicIdHome) => {
    const musicGet = musicState.musics.findIndex((music) => music._id === musicIdHome);
    console.log("getIdMusicNext", musicGet, musicState);
    dispatch({
      type: MUSIC_CLICK_NEXT,
      payload: musicState.musics[musicGet + 1],
    });
  };
  // Tìm ra bài hát pre (Bài hát pre so với bài hát hiện tại)
  const getIdMusicPre = (musicIdHome) => {
    const musicGet = musicState.musics.findIndex((music) => music._id === musicIdHome);
    console.log("musicGet_", musicGet, musicState);
    dispatch({
      type: MUSIC_CLICK_PRE,
      payload: musicState.musics[musicGet + 1],
    });
  };
  // Find id music when user click play music at favorite page
  const getIdMusicFavorite = (musicIdFavorite) => {
    const musicGet = musicState.musics.find((music) => music._id === musicIdFavorite);
    dispatch({
      type: MUSIC_CLICK_FAVORITE,
      payload: musicGet,
    });
  };

  // music context data
  const musicContextData = {
    musicState,
    getMusics,
    findIDMusic,
    getIdMusicHome,
    getIdMusicNext,
    getIdMusicPre,
    getIdMusicFavorite,
  };
  return <MusicContext.Provider value={musicContextData}> {children} </MusicContext.Provider>;
};

export default MusicContextProvider;
