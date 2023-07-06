// Returns an object with all the initialValues declared in the schema

export const generateInitialValues = (schema) => {
  const initialValues = {};

  schema.forEach((field) => {
    initialValues[field.name] = field.initialValue || "";
  });

  return initialValues;
};
