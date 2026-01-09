import * as yup from "yup";

export const eventSchema = yup
  .object({
    startDate: yup
      .string()
      .typeError("Start date is required")
      .required("Start date is required"),
    endDate: yup
      .string()
      .typeError("End date is required")
      .required("End date is required"),
  });

/** Type inference (Yup way) */
export type TEventFormData = yup.InferType<typeof eventSchema>;
