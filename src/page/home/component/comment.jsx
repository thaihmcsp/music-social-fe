import { RightCircleOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useState } from "react";

function Comment({ setComment, comment }) {
  const [changeValue, setChangeValue] = useState("");
  return (
    <Input
      defaultValue={""}
      onChange={(e) => {
        setChangeValue(e.target.value);
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
