import * as yup from "yup";

export const postSchema = yup.object({
  title: yup
    .string()
    .max(200, "The maximun title length is 200")
    .required("The title field is required"),

  description: yup.string().max(1000, "The maximun description length is 1000"),
});
