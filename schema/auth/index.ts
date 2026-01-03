import * as yup from "yup";

export const loginSchema = () =>
  yup.object().shape({
    email: yup
      .string()
      .email("invalid Email")
      .required("email Required"),
    password: yup
      .string()
      .required("password Required"),
  });

export default loginSchema;
