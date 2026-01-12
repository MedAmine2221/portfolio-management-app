import * as yup from "yup";

export const eventSchema = yup.object({
  startDate: yup
    .string()
    .typeError("Date de début est obligatoire")
    .required("Date de début est obligatoire")
    .test(
      "start-after-now",
      "La date de début doit être au moins 30 minutes après maintenant",
      function (value) {
        if (!value) return false;
        const now = new Date();
        const start = new Date(value);
        if (isNaN(start.getTime())) return false;
        const diffMinutes = (start.getTime() - now.getTime()) / (1000 * 60);
        return diffMinutes >= 30;
      }
    ),
  endDate: yup
    .string()
    .typeError("Date de fin est obligatoire")
    .required("Date de fin est obligatoire")
    .test(
      "end-after-start",
      "La date de fin doit être au moins 30 minutes après la date de début",
      function (value) {
        const { startDate } = this.parent;
        if (!value || !startDate) return false;
        const start = new Date(startDate);
        const end = new Date(value);       
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return false;
        const diffMinutes = (end.getTime() - start.getTime()) / (1000 * 60);        
        return diffMinutes >= 30;
      }
    ),
});

export type TEventFormData = yup.InferType<typeof eventSchema>;