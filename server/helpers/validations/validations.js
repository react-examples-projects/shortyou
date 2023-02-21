const yup = require("yup");
const idSchema = yup
  .string()
  .typeError("El indenficador debe ser un ObjectId")
  .required("El identificador es requerido");

const loginSchemaValidation = yup.object({
  body: yup.object({
    email: yup
      .string()
      .email("El correo debe ser válido, ejemplo: example@domain.es")
      .required("El correo es obligatorio"),
    password: yup
      .string()
      .min(6, "Mínimo 6 carácteres para la contraseña")
      .max(200, "Máximo 200 carácteres para la contraseña")
      .required("La contraseña es obligatoria"),
  }),
});
module.exports = {
  loginSchemaValidation,
};
