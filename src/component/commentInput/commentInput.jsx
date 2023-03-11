import { Form, Input } from "antd";
import React from "react";
import { Controller } from "react-hook-form";

export function commentInput(props) {
  const { control, required, defaultValue } = props;
  return (
    <div className="custom-input-comment">
      <Controller
        name="comment"
        control={control}
        defaultValue={defaultValue}
        render={({ field, fieldState }) => {
          const { message = "" } = fieldState.error || {};
          const status = message ? "error" : "";
          return (
            <Form.Item
              label={label}
              validateStatus={status}
              help={parseErrorMessage(message)}
              required={required}
            >
              <Input
                {...field}
                {...rest}
                onChange={(...agrs) => {
                  if (onChange) {
                    onChange(...agrs);
                  }
                  field.onChange(...agrs);
                }}
                onBlur={(event) => {
                  if (onBlur) {
                    onBlur(event);
                  }
                  field.onChange(trim(event.target.value));
                  field.onBlur();
                }}
              />
            </Form.Item>
          );
        }}
      />
    </div>
  );
}

commentInput.defaultProps = {
  defaultValue: "",
};
