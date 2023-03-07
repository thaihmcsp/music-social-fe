import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { CommentContext } from "../contexts/cmtContext";
import {
  ADD_FAVORITE,
  apiUpload,
  apiUploadFileMp3,
  apiUploadImgMp3,
  apiUrl,
} from "../contexts/constants";
import { FavoriteContext } from "../contexts/farvoriteContext";
import { MusicContext } from "../contexts/musicContext";
import edit from "../component/img/editing.png";

export default function PostItems({
  post: {
    user: { userName, userAvatar },
    postContent,
    music: { _id, musicName, musicImg, musicAuthor, musicFile },
  },
}) {
  console.log("_id", _id);
  // set state for play btn
  const { getIdMusicHome } = useContext(MusicContext);
  console.log("getMusicHome_", getIdMusicHome);
  const {
    authState: {
      user: { _id: userId },
    },
  } = useContext(AuthContext);
  const { getComments } = useContext(CommentContext);

  const musicError = document.querySelector(".music__noti");
  const musicPlayed = document.querySelector(".music__audio");
  const musicFooter = document.querySelector(".music-footer .music__audio");
  const musicFooterError = document.querySelector(".music-footer .music-notify");

  // set  music state at MusicContext to data music selected
  const getMusicSelected = async (music) => {
    console.log("music_", music);
    await getIdMusicHome(music);
    const playBtn = document.querySelector(".player-play");
    const urlMusic = document.querySelector(".progress__song");
    urlMusic.play();
    playBtn.classList.add("fa-pause");
    console.log("playBtn_", playBtn);
    console.log("urlMusic", urlMusic);
    console.log("urlMusic", urlMusic.play());
    musicError.style.display = "none";
    musicPlayed.style.display = "block";
    musicFooter.style.display = "flex";
    musicFooterError.style.display = "none";
  };
  const { dispatch } = useContext(FavoriteContext);
  const clickFavorite = (e) => {
    getMusicSelected.bind(this, _id);

    const formData = new FormData();
    formData.append("user", userId);
    formData.append("music", _id);
    console.log(userId, _id);
    axios
      .post(`${apiUrl}/favorites`, formData)
      .then((response) => {
        if (response.data.success) {
          dispatch({ type: ADD_FAVORITE, payload: response.data.favorite });
          return response.data;
        }
        if (!response.success) {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        if (error.response) return error.response;
        else return { success: false, message: error.message };
      });
  };

  return (
    <div className="post__items">
      <div className="owner">
        <img src={`${apiUpload}${userAvatar}`} alt="" />
        <a href="#">{userName}</a>
        {/* <img id="edit" src={edit} alt="" /> */}
      </div>
      <div className="contents">
        <span className="content">{postContent}</span>
      </div>
      <div onClick={getMusicSelected.bind(this, _id)} className="like">
        <img src={`${apiUploadImgMp3}${musicImg}`} className="img" alt="" />
        <h4 className="name">{musicName}</h4>
        <h4 className="author">{musicAuthor}</h4>

        <form onClick={clickFavorite} enctype="multipart/form-data">
          <a>
            <input style={{ display: "none" }} type="submit" />
            <i className="fa fa-heart" />
          </a>
        </form>

        <audio className="audio" src={`${apiUploadFileMp3}${musicFile}`} />
      </div>
      {/* <div className="comment">
        <form action>
          <input
            className="comment-input"
            type="text"
            placeholder="write a comment"
          />
          <button className="comment-btn">Comment</button>
        </form>
        <div className="comment__list">
          <div className="comment__list-item">
            <img className="avt" src="/img/avartar.jpg" alt="" />
            <div className="name-cmt">
              <span className="cmt-name">Trung Vũ</span>
              <div className="cmt-list">Rất hay</div>
            </div>
          </div>
        </div>
        <div className="comment__list">
          <div className="comment__list-item">
            <img className="avt" src="/img/avartar.jpg" alt="" />
            <div className="name-cmt">
              <span className="cmt-name">Tấn Sang</span>
              <div className="cmt-list">
                Hãy nhớ rằng, đó không phải là nội dung của bạn. Nó thậm chí
                không phải là nội dung của SoundCloud.
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
