import React, { useState } from "react";
import { EditOutlined, RightCircleOutlined } from "@ant-design/icons";
import "./CommentField.scss";
import { Input, notification } from "antd";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
function CommentField(item, apiUpload, token) {
  const [isEdit, setIsEdit] = useState(false);
  const [changeValue, setChangeValue] = useState("");

  const editComment = async () => {
    try {
      const response = await axios.patch(
        `${apiUrl}/comments/update-comment/${item.user._id}`,
        { cmtContent: changeValue },
        { headers: { Authorization: "Bearer " + token } }
      );
      notification.success({
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="comment-item-wrapper">
      <div className="d-flex">
        <img src={`${apiUpload}/${item.user.userAvatar}`} />
        <div>{item.user.userName}</div>
      </div>
      {!isEdit ? (
        <div>{item.cmtContent}</div>
      ) : (
        <Input
          defaultValue={item.cmtContent}
          onChange={(e) => {
            setChangeValue(e.target.value);
          }}
          addonAfter={
            <RightCircleOutlined
              onClick={(e) => {
                editComment();
              }}
            />
          }
        />
      )}
      <EditOutlined
        onClick={() => {
          setIsEdit(true);
        }}
      />
    </div>
  );
}

export default CommentField;
