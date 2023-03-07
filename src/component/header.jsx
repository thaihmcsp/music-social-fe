import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { apiUpload, LOCAL_STORAGE_TOKEN_NAME } from "../contexts/constants";
import { PostContext } from "../contexts/postContext";

export default function Header() {
  const {
    authState: {
      user: { userName, userAvatar },
      isAuthenticated,
    },

    logoutUser,
  } = useContext(AuthContext);

  // const history = useHistory();

  const logout = () => {
    logoutUser();

    console.log(isAuthenticated);
  };
  // search function
  const { searchPost } = useContext(PostContext);

  const [search, setSearch] = useState("");

  const onChangeSearch = function (value) {
    setSearch(value.target.value);
    searchPost(search);
    console.log(search);
  };

  return (
    <header className="header__main">
      <div className="container-fluid">
        <div className="logo">
          <a href="/home">
            <img src="/img/logo1.svg" alt="" />
          </a>
        </div>
        <div className="search">
          <i className="search-icon fa fa-search" />
          <input
            type="text"
            inputMode="search"
            placeholder="Searching for other people's posts"
            className="search-input"
            onChange={onChangeSearch}
          />
        </div>
        <div className="right">
          <div className="user">
            <img
              src={`${apiUpload}${userAvatar}`}
              alt=""
              className="user__avatar"
            />
            <div className="user__name">
              <h2 className="user__name-title">{userName}</h2>
            </div>
          </div>
          <div id="notiBtn">
            <i className="fa fa-bell tool-icon" />
          </div>
          <a onClick={logout} className="btn1">
            Log out
          </a>
        </div>
      </div>
    </header>
  );
}
