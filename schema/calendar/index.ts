import * as yup from "yup";

export const eventSchema = yup
  .object({
    user: yup.string().required("User is required"),

    title: yup.string().required("Title is required"),

    description: yup.string().required("Description is required"),

    startDate: yup
      .date()
      .typeError("Start date is required")
      .required("Start date is required"),

    startTime: yup
      .object({
        hour: yup.number().required(),
        minute: yup.number().required(),
      })
      .required("Start time is required"),

    endDate: yup
      .date()
      .typeError("End date is required")
      .required("End date is required"),

    endTime: yup
      .object({
        hour: yup.number().required(),
        minute: yup.number().required(),
      })
      .required("End time is required"),

    color: yup
      .mixed<"blue" | "green" | "red" | "yellow" | "purple" | "orange" | "gray">()
      .oneOf(
        ["blue", "green", "red", "yellow", "purple", "orange", "gray"],
        "Color is required"
      )
      .required("Color is required"),
  })
  .test(
    "start-before-end",
    "Start date cannot be after end date",
    function (values) {
      const { startDate, startTime, endDate, endTime } = values;

      if (!startDate || !endDate || !startTime || !endTime) return true;

      const startDateTime = new Date(startDate);
      startDateTime.setHours(startTime.hour, startTime.minute, 0, 0);

      const endDateTime = new Date(endDate);
      endDateTime.setHours(endTime.hour, endTime.minute, 0, 0);

      return startDateTime < endDateTime;
    }
  );

/** Type inference (Yup way) */
export type TEventFormData = yup.InferType<typeof eventSchema>;
