import {
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Field } from "formik";
import React from "react";

interface CustomFieldProps {
  fieldValue: string;
  isPassword?: boolean;
}

const CustomField: React.FC<CustomFieldProps> = ({
  fieldValue,
  isPassword = false,
}) => {
  const formatFieldValue = (string: string) => {
    return string
      .replace(/(_|-)/g, " ")
      .trim()
      .replace(/\w\S*/g, function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
      })
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2");
  };

  const formattedValue = formatFieldValue(fieldValue);
  return (
    <Field name={fieldValue}>
      {({ field, form }: any) => (
        <FormControl
          isInvalid={form.errors[fieldValue] && form.touched[fieldValue]}
        >
          <FormLabel marginTop="1em" htmlFor={fieldValue}>
            {formattedValue}
          </FormLabel>
          <Input
            {...field}
            id={fieldValue}
            placeholder={`Enter ${formattedValue}`}
            type={isPassword ? "password" : "text"}
          />
          <FormErrorMessage>{form.errors[fieldValue]}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};

export default CustomField;
