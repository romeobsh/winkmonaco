import { generateMongooseModel } from "@/lib/generators/generateMongooseModel";
import { generateColumns } from "@/lib/generators/generateColumns";
import { generateCollectionApiHandler } from "@/lib/generators/generateCollectionApiHandler";
import { generateElementApiHandler } from "@/lib/generators/generateElementApiHandler";
import { generateFormik } from "@/lib/generators/generateFormik";
import CustomDatagrid from "@/components/datagrid/CustomDatagrid";
import { string, number, date } from "yup";

//* General model definition
export const subscriptionSchema = [
  {
    name: "fullName",
    placeholder: "Nom complet",
    type: "text",
    initialValue: "",
    muiHeaderName: "Nom complet",
    muiType: "string",
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("Le nom complet est requis"),
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
    yupValidations: string(),
  },
  {
    name: "email",
    placeholder: "Adresse e-mail",
    type: "text",
    initialValue: "",
    muiHeaderName: "Adresse e-mail",
    muiType: "string",
    muiFlex: 4,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().email("Entrez une adresse e-mail valide"),
  },
  {
    name: "iban",
    placeholder: "IBAN",
    type: "text",
    initialValue: "",
    muiHeaderName: "IBAN",
    muiType: "string",
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("L'IBAN est requis")
      .min(12, "L'IBAN ne peut pas faire moins de 12 caractères")
      .max(64, "L'IBAN ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "address",
    placeholder: "Adresse complète",
    type: "text",
    initialValue: "",
    muiHeaderName: "Adresse complète",
    muiType: "string",
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("L'adresse complète est requise")
      .min(12, "L'adresse complète ne peut pas faire moins de 12 caractères")
      .max(256, "L'adresse complète ne peut pas faire plus de 256 caractères"),
  },
  {
    name: "amount",
    placeholder: "Montant actif",
    type: "number",
    initialValue: 0,
    muiHeaderName: "Montant actif",
    muiType: "number",
    muiFlex: 1,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: false,
    yupValidations: number().nullable(true),
  },
  {
    name: "status",
    placeholder: "Statut",
    type: "text",
    initialValue: "pending",
    muiHeaderName: "Statut",
    muiType: "singleSelect",
    muiMdSize: 6,
    selectOptions: [
      {
        value: "pending",
        label: "Demande d'abonnement",
      },
      { value: "subscribed", label: "Abonné" },
      { value: "requestForCancellation", label: "Demande résiliation" },
      { value: "cancelled", label: "Résilié" },
      { value: "newAmountAsked", label: "Demande changement montant" },
    ],
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("Statut requis"),
  },
  {
    name: "amountAsked",
    placeholder: "Montant demandé",
    type: "number",
    initialValue: 0,
    muiHeaderName: "Montant demandé",
    muiType: "number",
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: false,
    yupValidations: number().nullable(true),
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
    muiMdSize: 6,
    muiHidden: true,
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required("Date requise"),
  },
  {
    name: "comment",
    placeholder: "Commentaire",
    type: "text",
    initialValue: "",
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

export const Subscription = generateMongooseModel("Subscription", subscriptionSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const subscriptionsColumns = (handleDelete) => generateColumns(subscriptionSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const SubscriptionFormik = ({ id, title, children }) => generateFormik(subscriptionSchema, "subscriptions", title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const subscriptionsAPIHandler = generateCollectionApiHandler(Subscription);
export const subscriptionAPIHandler = generateElementApiHandler(Subscription);

//* --------
//* Datagrid
//* --------

export const SubscriptionsDatagrid = () => <CustomDatagrid schema={subscriptionSchema} title='Abonnements' endpoint='subscriptions' />;
