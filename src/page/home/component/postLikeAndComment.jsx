import React, { useState } from "react";
import Icon, { LikeFilled } from "@ant-design/icons";
import Comment from "./comment";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../../contexts/constants";

const LikeIcon = (style, addStyle) => {
  return <LikeFilled style={{ ...style, ...addStyle }} />;
};

function PostLikeAndComment({ isLike, musiclikeCount, musicId, userId }) {
  const [addStyle, setAddStyle] = useState(() => {
    if (isLike) {
      return { color: "blue" };
    }

    return { color: "#9d99c3" };
  });

  const [likeCount, setlikeCount] = useState(musiclikeCount);
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  const clickLike = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/music/like/${musicId}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );

      const listLike = response.data.data.musicLike;
      setlikeCount(listLike.length);
      if (listLike.includes(userId)) {
        return setAddStyle({ color: "blue" });
      }
      setAddStyle({ color: "#9d99c3" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{ display: "flex", alignItems: "center", marginRight: "20px" }}
        >
          <Icon
            component={(style) => LikeIcon(style, addStyle)}
            onClick={clickLike}
            style={{ marginRight: "12px" }}
          />
          {likeCount}
        </div>
        <Comment />
      </div>
    </div>
  );
}

export default PostLikeAndComment;
