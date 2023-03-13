import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

export function CommentInput(props) {
  const { control, required, defaultValue, name, onChange } = props;
  return (
    <div className="custom-input-comment">
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          const { message = "" } = fieldState.error || {};
          const status = message ? "error" : "";
          return (
            <Form.Item validateStatus={status} required={required}>
              <Input
                {...field}
                onChange={(...agrs) => {
                  if (onChange) {
                    onChange(...agrs);
                  }
                  field.onChange(...agrs);
                }}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
}

CommentInput.defaultProps = {
  defaultValue: "",
};
