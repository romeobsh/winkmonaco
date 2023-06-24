import * as yup from "yup";

export function generateYupSchema(schema) {
  const validationSchema = {};

  schema.forEach((field) => {
    validationSchema[field.name] = field.yupValidations;
  });

  return yup.object(validationSchema);
}
