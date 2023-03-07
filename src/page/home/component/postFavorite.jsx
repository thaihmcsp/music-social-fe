import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/authContext";
import { FavoriteContext } from "../../../contexts/farvoriteContext";
// import Ripple from "@bit/joshk.react-spinners-css.ripple";
import { apiUploadFileMp3, apiUploadImgMp3 } from "../../../contexts/constants";

export default function PostFavorite() {
  // get global data by useContext
  const {
    favoriteState: { favorites, favoritesLoading },
    getFavorites,
    deleteFavorite,
  } = useContext(FavoriteContext);
  const {
    authState: {
      user: { _id: userId },
    },
  } = useContext(AuthContext);

  // start get all favorites
  useEffect(() => getFavorites(), []);

  // check id for render favorites data
  const checkIdFavorite = favorites.filter((favorite) => {
    return favorite.user._id === userId;
  });

  const deleteFavoriteClick = (favoriteId) => {
    deleteFavorite(favoriteId);
  };

  //check data uploaded for render
  if (favoritesLoading) {
    return (
      <div style={{ width: "100%", height: "100vh", position: "absolute" }}>
        {/* <Ripple
          style={{
            top: "50%",
            left: "50%",
            position: "relative",
            transform: "translate(-50%, -50%)",
          }}
          color="#be97e8"
        />{" "}
        ;{" "} */}
      </div>
    );
  } else {
    return (
      <div className="postfavrorite post-list post-list-3">
        <div className="post__items">
          <div className="favorites">
            <h3 className="title">My favorite playlist</h3>
            <div className="box__favor">
              {checkIdFavorite.map((favorite) => (
                <div className="like">
                  <img
                    src={`${apiUploadImgMp3}${favorite.music.musicImg}`}
                    className="img"
                    alt=""
                  />
                  <h4 className="name">{favorite.music.musicName}</h4>
                  <h4 className="author">{favorite.music.musicAuthor}</h4>
                  <a href="#">
                    <i
                      onClick={deleteFavoriteClick.bind(this, favorite._id)}
                      className="fa fa-heart"
                    />
                  </a>
                  <audio className="audio" src={`${apiUploadFileMp3}${favorite.music.musicFile}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
