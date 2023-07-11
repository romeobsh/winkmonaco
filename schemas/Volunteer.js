import { generateMongooseModel } from "@/lib/generators/generateMongooseModel";
import { generateColumns } from "@/lib/generators/generateColumns";
import { generateCollectionApiHandler } from "@/lib/generators/generateCollectionApiHandler";
import { generateElementApiHandler } from "@/lib/generators/generateElementApiHandler";
import { generateFormik } from "@/lib/generators/generateFormik";
import CustomDatagrid from "@/components/datagrid/CustomDatagrid";
import { string } from "yup";

//* General model definition
export const volunteerSchema = [
  {
    name: "firstName",
    placeholder: "Prénom",
    type: "text",
    initialValue: "",
    muiHeaderName: "Prénom",
    muiType: "string",
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("Le prénom est requis"),
  },
  {
    name: "lastName",
    placeholder: "Nom",
    type: "text",
    initialValue: "",
    muiHeaderName: "Nom",
    muiType: "string",
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("Le nom est requis"),
  },
  {
    name: "email",
    placeholder: "Adresse e-mail",
    type: "text",
    initialValue: "",
    muiHeaderName: "Adresse e-mail",
    muiType: "string",
    muiFlex: 4,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'email est requis").email("Entrez une adresse e-mail valide"),
  },
  {
    name: "tel",
    placeholder: "06 01 02 03 04",
    type: "text",
    initialValue: "",
    muiHeaderName: "Tel",
    muiType: "string",
    muiFlex: 1.5,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string()
      .required("Téléphone requis")
      .matches(/^(\+[0-9]{1,3}\s?)?(\([0-9]{1,}\)\s?)?([0-9]|-|\s){5,}$/, "Numéro de téléphone invalide"),
  },
  {
    name: "address",
    placeholder: "Adresse complète",
    type: "text",
    initialValue: "",
    multiline: true,
    minRows: 3,
    muiHeaderName: "Adresse complète",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("L'adresse complète est requise")
      .min(12, "L'adresse complète ne peut pas faire moins de 12 caractères")
      .max(256, "L'adresse complète ne peut pas faire plus de 256 caractères"),
  },
  {
    name: "job",
    placeholder: "Profession",
    type: "text",
    initialValue: "",
    muiHeaderName: "Profession",
    muiType: "string",
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().max(64, "La profession ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "comment",
    placeholder: "Commentaire",
    type: "text",
    initialValue: "",
    multiline: true,
    minRows: 2,
    muiHeaderName: "Commentaire",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string(),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const Volunteer = generateMongooseModel("Volunteer", volunteerSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const volunteersColumns = (handleDelete) => generateColumns(volunteerSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const VolunteerFormik = ({ id, title, children }) => generateFormik(volunteerSchema, "volunteers", title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const volunteersAPIHandler = generateCollectionApiHandler(Volunteer);
export const volunteerAPIHandler = generateElementApiHandler(Volunteer);

//* --------
//* Datagrid
//* --------

export const VolunteersDatagrid = () => <CustomDatagrid schema={volunteerSchema} title='Volontaires' endpoint='volunteers' />;
