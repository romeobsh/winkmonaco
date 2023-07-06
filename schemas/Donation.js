import { generateMongooseModel } from "@/lib/generators/generateMongooseModel";
import { generateColumns } from "@/lib/generators/generateColumns";
import { generateCollectionApiHandler } from "@/lib/generators/generateCollectionApiHandler";
import { generateElementApiHandler } from "@/lib/generators/generateElementApiHandler";
import { date, number, string } from "yup";
import { generateFormik } from "@/lib/generators/generateFormik";
import CustomDatagrid from "@/components/datagrid/CustomDatagrid";

//* General schema definition
export const donationSchema = [
  {
    name: "fullName",
    placeholder: "Nom complet",
    type: "text",
    initialValue: "",
    muiHeaderName: "Nom complet",
    muiType: "string",
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Nom complet requis")
      .min(6, "Le nom complet ne peut pas faire moins de 6 caractères")
      .max(64, "Le nom complet ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "email",
    placeholder: "Email",
    type: "text",
    initialValue: "",
    muiHeaderName: "Email",
    muiType: "string",
    muiFlex: 2,
    mongooseType: String,
    yupValidations: string().email("Email invalide"),
  },
  {
    name: "amount",
    placeholder: "Montant",
    type: "number",
    initialValue: 0,
    muiHeaderName: "Montant",
    muiType: "number",
    muiFlex: 1,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: true,
    yupValidations: number().required("Montant du don requis").positive("Le montant ne peut pas être négatif"),
  },
  {
    name: "type",
    placeholder: "Type",
    type: "text",
    initialValue: "virement",
    muiHeaderName: "Type",
    muiType: "singleSelect",
    muiMdSize: 6,
    selectOptions: [
      {
        value: "virement",
        label: "Virement",
      },
      { value: "liquide", label: "Liquide" },
      { value: "cb", label: "CB" },
      { value: "cheque", label: "Chèque" },
      { value: "subscription", label: "Virement (abonnement)" },
    ],
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("Type requis"),
  },
  {
    name: "createdAt",
    placeholder: "Date",
    type: "date",
    disabled: true,
    initialValue: new Date(),
    fullWidth: false,
    muiHeaderName: "Date",
    muiType: "date",
    muiFlex: 2,
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required("Date requise"),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const Donation = generateMongooseModel("Donation", donationSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const donationsColumns = (handleDelete) => generateColumns(donationSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const DonationFormik = ({ id, title, children }) => generateFormik(donationSchema, "donations", title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const donationsAPIHandler = generateCollectionApiHandler(Donation);
export const donationAPIHandler = generateElementApiHandler(Donation);

//* --------
//* Datagrid
//* --------

export const DonationsDatagrid = () => <CustomDatagrid schema={donationSchema} title='Donations' endpoint='donations' />;
