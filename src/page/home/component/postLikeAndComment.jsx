import React, { useEffect, useState } from "react";
import Icon, { LikeFilled } from "@ant-design/icons";
import Comment from "./comment";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "../../../contexts/constants";
import { notification } from "antd";

const LikeIcon = (style, addStyle) => {
  return <LikeFilled style={{ ...style, ...addStyle }} />;
};

function PostLikeAndComment({
  isLike,
  musiclikeCount,
  musicId,
  userId,
  postId,
  getListComment,
  postLike,
}) {
  const [addStyle, setAddStyle] = useState(() => {
    if (isLike) {
      return { color: "blue" };
    }

    return { color: "#9d99c3" };
  });

  const [likeCount, setlikeCount] = useState(postLike);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME);
  const clickLike = async () => {
    try {
      const response = await axios.patch(
        `${apiUrl}/posts/like-post/${postId}`,
        {},
        { headers: { Authorization: "Bearer " + token } }
      );

      const listLike = response.data.data.post.like;
      setlikeCount(listLike.length);
      if (listLike.includes(userId)) {
        return setAddStyle({ color: "blue" });
      }
      setAddStyle({ color: "#9d99c3" });
    } catch (error) {
      console.log(error);
    }
  };

  const sendComment = async (input) => {
    try {
      const response = await axios.post(
        `${apiUrl}/comments/post/${postId}`,
        { cmtContent: input ? input : comment },
        { headers: { Authorization: "Bearer " + token } }
      );
      notification.success({
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const createCommnet = async () => {
      if (comment) {
        await sendComment();
      }
      getListComment();
    };
    createCommnet();
  }, [comment]);
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <Icon
            component={(style) => LikeIcon(style, addStyle)}
            onClick={clickLike}
            style={{ marginRight: "12px" }}
          />
          {likeCount}
        </div>
        <Comment
          comment={comment}
          setComment={setComment}
          getListComment={getListComment}
          sendComment={sendComment}
        />
      </div>
    </div>
  );
}

export default PostLikeAndComment;
