import mongoose from "mongoose";

export const generateMongooseModel = (modelName, modelDefinition) => {
  const schemaFields = {};

  for (const field of modelDefinition) {
    const { name, mongooseType, required } = field;

    //* Set the field as required if the `required` property is present and not false
    if (required) {
      schemaFields[name] = { mongooseType, required: true };
    } else {
      schemaFields[name] = mongooseType;
    }
  }

  const schema = new mongoose.Schema(schemaFields, {
    timestamps: true,
  });

  return mongoose.models?.[modelName] || mongoose.model(modelName, schema);
};
