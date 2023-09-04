import { generateMongooseModel } from "@/lib/generators/generateMongooseModel";
import { generateColumns } from "@/lib/generators/generateColumns";
import { generateCollectionApiHandler } from "@/lib/generators/generateCollectionApiHandler";
import { generateElementApiHandler } from "@/lib/generators/generateElementApiHandler";
import { string } from "yup";
import { generateFormik } from "@/lib/generators/generateFormik";
import CustomDatagrid from "@/components/datagrid/CustomDatagrid";

//* General schema definition
export const paymentInfoSchema = [
  {
    name: "ownerName",
    placeholder: "Nom du propriétaire",
    type: "text",
    initialValue: "",
    title: "Virements",
    muiHeaderName: "Nom complet",
    muiType: "string",
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Nom du propriétaire requis")
      .min(6, "Le nom du propriétaire ne peut pas faire moins de 6 caractères")
      .max(64, "Le nom du propriétaire ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "iban",
    placeholder: "IBAN",
    type: "text",
    initialValue: "",
    muiHeaderName: "IBAN",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("L'IBAN est requis")
      .min(12, "L'IBAN ne peut pas faire moins de 12 caractères")
      .max(64, "L'IBAN ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "bic",
    placeholder: "BIC",
    type: "text",
    initialValue: "",
    muiHeaderName: "BIC",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Le BIC est requis")
      .min(3, "Le BIC ne peut pas faire moins de 3 caractères")
      .max(64, "Le BIC ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "recipient",
    placeholder: "Destinataire",
    type: "text",
    initialValue: "",
    title: "Chèques",
    muiHeaderName: "Destinataire",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Le destinataire est requis")
      .min(3, "Le destinataire ne peut pas faire moins de 3 caractères")
      .max(64, "Le destinataire ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "address",
    placeholder: "Adresse",
    type: "text",
    initialValue: "",
    muiHeaderName: "Adresse",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("L'adresse est requise")
      .min(3, "L'adresse ne peut pas faire moins de 3 caractères")
      .max(128, "L'adresse ne peut pas faire plus de 64 caractères"),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const PaymentInfoModel = generateMongooseModel("PaymentInfo", paymentInfoSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const paymentInfosColumns = (handleDelete) => generateColumns(paymentInfoSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const PaymentInfoFormik = ({ id, title, children }) => generateFormik(paymentInfoSchema, "paymentInfos", title, id, "donations")({ children });

//* ------------
//* API Handlers
//* ------------

export const paymentInfosAPIHandler = generateCollectionApiHandler(PaymentInfoModel);
export const paymentInfoAPIHandler = generateElementApiHandler(PaymentInfoModel);

//* --------
//* Datagrid
//* --------

export const PaymentInfosDatagrid = () => <CustomDatagrid schema={paymentInfoSchema} title='PaymentInfos' endpoint='paymentInfos' />;
