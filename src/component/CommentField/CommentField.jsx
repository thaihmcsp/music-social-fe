import React, { useState } from "react";
import {
  CloseCircleOutlined,
  EditOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import "./CommentField.scss";
import { Input, notification } from "antd";
import axios from "axios";
import { apiUrl } from "../../contexts/constants";
import { message, Popconfirm } from "antd";
function CommentField({ item, apiUpload, token, getListComment, userId }) {
  const [isEdit, setIsEdit] = useState(false);
  const [changeValue, setChangeValue] = useState("");

  const editComment = async () => {
    try {
      const response = await axios.patch(
        `${apiUrl}/comments/update-comment/${item._id}`,
        { cmtContent: changeValue },
        { headers: { Authorization: "Bearer " + token } }
      );
      await getListComment();
      setIsEdit(false);
      notification.success({
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/comments/delete-comment/${item._id}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      await getListComment();
      setIsEdit(false);
      notification.success({
        message: response.data.message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const writeComment = (e) => {
    setChangeValue(e.target.value);
  };

  const interactComment = () => {
    if (userId === item.user._id) {
      if (isEdit) {
        return (
          <CloseCircleOutlined
            onClick={() => {
              setIsEdit(false);
            }}
          />
        );
      } else {
        return (
          <Popconfirm
            placement="right"
            onConfirm={() => {
              setIsEdit(true);
            }}
            onCancel={deleteComment}
            okText="update"
            cancelText="Delete"
          >
            <EditOutlined />
          </Popconfirm>
        );
      }
    }
  };
  return (
    <div className="comment-item-wrapper">
      <div className="d-flex">
        <img src={`${apiUpload}/${item.user.userAvatar}`} />
        <div className="comment-content-wrap">
          <div className="comment-user">
            <div>{item.user.userName} </div>
            {interactComment()}
          </div>
          {!isEdit ? (
            <div className="comment-text-content">{item.cmtContent}</div>
          ) : (
            <Input
              defaultValue={item.cmtContent}
              onChange={(e) => {
                writeComment(e);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  editComment();
                }
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
        </div>
      </div>
    </div>
  );
}

export default CommentField;
