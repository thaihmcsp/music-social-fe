import { RightCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";

function Comment({ setComment, comment, getListComment, sendComment }) {
  const [changeValue, setChangeValue] = useState("");

  const writeComment = (e) => {
    if (e.keyCode === 13) {
      setComment(changeValue);
    }
  };
  return (
    <Input
      defaultValue={""}
      onChange={(e) => {
        setChangeValue(e.target.value);
      }}
      onKeyDown={(e) => {
        writeComment(e);
      }}
      addonAfter={
        <RightCircleOutlined
          onClick={(e) => {
            setComment(changeValue);
          }}
        />
      }
    />
  );
}

export default Comment;
