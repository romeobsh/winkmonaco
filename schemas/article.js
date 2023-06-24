import { generateYupSchema } from "@/lib/generators/generateYupSchema";
import { generateMongooseModel } from "@/lib/generators/generateMongooseModel";
import { generateColumns } from "@/lib/generators/generateColumns";
import { generateInitialValues } from "@/lib/generators/generateInitialValues";
import { generateCollectionApiHandler } from "@/lib/generators/generateCollectionApiHandler";
import { generateElementApiHandler } from "@/lib/generators/generateElementApiHandler";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { bool, date, string } from "yup";
import { generateFormik } from "@/lib/generators/generateFormik";

//* General model definition
export const articleSchema = [
  {
    name: "title",
    placeholder: "Titre de l'article",
    type: "text",
    initialValue: "",
    muiHeaderName: "Titre",
    muiType: "string",
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Le titre de l'article est requis")
      .min(3, "Le titre ne peut pas faire moins de 3 caractères")
      .max(64, "Le titre ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "content",
    placeholder: "Contenu de l'article",
    type: "text",
    multiline: true,
    minRows: 4,
    initialValue: "",
    muiHeaderName: "Contenu",
    muiType: "string",
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Le contenu est requis")
      .min(120, "Le contenu ne peut pas faire moins de 120 caractères")
      .max(3000, "Le contenu ne peut pas faire plus de 3000 caractères"),
  },
  {
    name: "imageUrl",
    placeholder: "URL de l'image de l'article",
    type: "text",
    initialValue: "",
    muiHeaderName: "URL de l'image",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image de l'article est requis").url("Entrez un URL valide"),
  },
  {
    name: "createdAt",
    placeholder: "Date de création de l'article",
    type: "date",
    disabled: true,
    initialValue: new Date(),
    muiHeaderName: "Date de création",
    muiType: "date",
    muiFlex: 2,
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required("La date de création de l'article est requise"),
  },
  {
    name: "priority",
    placeholder: "Mise en avant de l'article",
    type: "checkbox",
    initialValue: false,
    muiHeaderName: "En priorité",
    muiType: "boolean",
    muiFlex: 1.5,
    muiRenderCell: (params) =>
      params.row.priority ? <CheckCircle sx={{ color: "green", fontSize: "2rem" }} /> : <Cancel sx={{ color: "red", fontSize: "2rem" }} />,
    mongooseType: Boolean,
    mongooseRequired: true,
    yupValidations: bool().required("La priorité de l'article est requise"),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const Article = generateMongooseModel("Article", articleSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const articlesColumns = generateColumns(articleSchema);

//* ---------------
//* Formik creation
//* ---------------

const articleValidationSchema = generateYupSchema(articleSchema);
export const articleInitialValues = generateInitialValues(articleSchema);
export const ArticleFormik = ({ id, initialValues, children }) =>
  generateFormik(initialValues ?? articleInitialValues, articleValidationSchema, "articles", id)({ children });

//* ------------
//* API Handlers
//* ------------

export const articlesAPIHandler = generateCollectionApiHandler(Article);
export const articleAPIHandler = generateElementApiHandler(Article);
