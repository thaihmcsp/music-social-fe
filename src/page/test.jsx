import React from "react";
import { useForm } from "react-hook-form";
import { CommentInput } from "../component/commentInput/commentInput";
function Test() {
  const { control } = useForm();

  return (
    <div>
      <CommentInput
        control={control}
        required={false}
        defaultValue={""}
        name={"abc"}
      />
    </div>
  );
}

export default Test;
