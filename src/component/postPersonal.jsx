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
import editimg from "../component/img/editing.png";
import deleteimg from "../component/img/delete.png";
import PopupUpdatePost from "../page/home/component/popupUpdatepost";
import { PostContext } from "../contexts/postContext";

export default function PostItemsPerson({
  post: {
    _id: postId,
    user: { userName, userAvatar },
    postContent,
    music: { _id, musicName, musicImg, musicAuthor, musicFile },
  },
}) {
  // set state for play btn
  const { getIdMusicHome } = useContext(MusicContext);
  const {
    authState: {
      user: { _id: userId },
    },
  } = useContext(AuthContext);
  const { getComments } = useContext(CommentContext);

  const musicError = document.querySelector(".music__noti");
  const musicPlayed = document.querySelector(".music__audio");

  // set  music state at MusicContext to data music selected
  const getMusicSelected = async (music) => {
    getIdMusicHome(music);
    musicError.style.display = "none";
    musicPlayed.style.display = "block";
  };
  const { dispatch } = useContext(FavoriteContext);
  const clickFavorite = (e) => {
    getMusicSelected.bind(this, _id);
    const formData = new FormData();
    formData.append("user", userId);
    formData.append("music", _id);
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

  const { findIDPost, deletePost } = useContext(PostContext);

  // open popup
  function onPopupMusic(postId) {
    const popUpEdit = document.querySelector(".edit-popup");
    popUpEdit.classList.add("active");
    findIDPost(postId);
  }

  const deletePostId = (postId) => {
    const promtPost = window.confirm(
      `Are you sure you want to delete this's post`
    );
    if (promtPost) {
      deletePost(postId);
    }
  };

  return (
    <div className="post__items">
      <div className="owner">
        <img src={`${apiUpload}${userAvatar}`} alt="" />
        <a href="#">{userName}</a>
        <img
          onClick={onPopupMusic.bind(this, postId)}
          id="edit"
          src={editimg}
          alt=""
        />
        <img
          onClick={deletePostId.bind(this, postId)}
          id="edit"
          src={deleteimg}
          alt=""
        />
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
      <PopupUpdatePost />
    </div>
  );
}
