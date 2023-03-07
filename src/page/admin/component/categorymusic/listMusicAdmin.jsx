import React, { useContext, useState } from "react";
import { apiUploadFileMp3, apiUploadImgMp3 } from "../../../../contexts/constants";
import { apiUrl, UPDATE_MUSIC } from "../../../../contexts/constants";
import { MusicContext } from "../../../../contexts/musicContext";
import axios from "axios";
import PopupMusic from "./popupMusic";
// import Ripple from "@bit/joshk.react-spinners-css.ripple";

export default function ListMusicAdmin({
  music: { _id, musicName, musicAuthor, musicImg, musicFile },
}) {
  const { music, dispatch, findIDMusic } = useContext(MusicContext);

  function editMussic(musicId) {
    findIDMusic(musicId);
    const popUpEdit = document.querySelector(".edit-popup");
    setTimeout(() => popUpEdit.classList.add("active"), 500);
  }

  // // close popup
  // function outPopupMusic(musicId) {
  //   const popUpEdit = document.querySelector(".edit-popup");
  //   popUpEdit.classList.remove("active");
  // }

  // // local state
  // const [updateMusic, setupdateMusic] = useState({
  //   musicName: "",
  //   musicAuthor: "",
  //   musicImg: "",
  //   musicFile: "",
  //   musicCategory: "",
  // });

  // // get data as user input
  // const onChangeMusicForm = function (event) {
  //   setupdateMusic({ ...updateMusic, [event.target.name]: event.target.value });
  // };

  // //get img file as user input
  // const onChangeFileImgForm = function (event) {
  //   setupdateMusic({ ...updateMusic, musicImg: event.target.files[0] });
  // };

  // //get mp3 file as user input
  // const onChangeMp3Form = function (event) {
  //   setupdateMusic({ ...updateMusic, musicFile: event.target.files[0] });
  // };

  // const onSubmitUpdate = function (e) {
  //   e.preventDefault();

  //   // initialize formdata to store values in state and assign those values to name in input
  //   const formData = new FormData();
  //   formData.append("musicName", updateMusic.musicName);
  //   formData.append("musicAuthor", updateMusic.musicAuthor);
  //   formData.append("musicImg", updateMusic.musicImg);
  //   formData.append("musicFile", updateMusic.musicFile);
  //   formData.append("musicCategory", updateMusic.musicCategory);

  //   axios
  //     .put(`${apiUrl}/music/update/`, formData)
  //     .then((response) => {
  //       if (response.data.success) {
  //         dispatch({ type: UPDATE_MUSIC, payload: response.data.music });
  //         return response.data;
  //       }
  //     })
  //     .catch((error) => {
  //       return error.response
  //         ? error.response
  //         : { success: false, message: "Server error" };
  //     });
  // };

  return (
    <div className="like">
      <img className="img" src={`${apiUploadImgMp3}${musicImg}`} alt="" />
      <h5 className="name">{musicName}</h5>
      <h5 className="author">{musicAuthor}</h5>
      <audio className="audio" src={`${apiUploadFileMp3}${musicFile}`} />
      <button className="item-create edit" onClick={editMussic.bind(this, _id)}>
        Edit
      </button>
      <PopupMusic />
    </div>
  );
}
