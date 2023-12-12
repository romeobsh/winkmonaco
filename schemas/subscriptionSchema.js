import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { string, number, date } from 'yup';

//* General model definition
export const subscriptionSchema = [
  {
    name: 'title',
    placeholder: 'Civilité',
    type: 'text',
    initialValue: 'm',
    muiHeaderName: 'Civilité',
    muiType: 'singleSelect',
    muiMdSize: 2,
    selectOptions: [
      {
        value: 'm',
        label: 'M.',
      },
      { value: 'ms', label: 'Mme.' },
      { value: 'other', label: 'Autre' },
    ],
    muiFlex: 0.5,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Civilité requise'),
  },
  {
    name: 'firstName',
    placeholder: 'Prénom',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Prénom',
    muiType: 'string',
    muiMdSize: 4,
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Prénom requis')
      .min(2, 'Le prénom ne peut pas faire moins de 2 caractères')
      .max(32, 'Le prénom ne peut pas faire plus de 32 caractères'),
  },
  {
    name: 'lastName',
    placeholder: 'Nom',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Nom',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Nom de famille requis')
      .min(2, 'Le nom de famille ne peut pas faire moins de 2 caractères')
      .max(32, 'Le nom de famille ne peut pas faire plus de 32 caractères'),
  },
  {
    name: 'email',
    placeholder: 'Email',
    muiMdSize: 6,
    autocorrect: false,
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Email',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    yupValidations: string().email('Email invalide'),
  },
  {
    name: 'address',
    placeholder: 'Adresse',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Adresse',
    muiType: 'string',
    muiFlex: 4,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("L'adresse est requise")
      .min(12, "L'adresse ne peut pas faire moins de 12 caractères")
      .max(256, "L'adresse ne peut pas faire plus de 256 caractères"),
  },
  {
    name: 'addressDetails',
    placeholder: "Complément d'adresse",
    type: 'text',
    initialValue: '',
    muiHeaderName: "Complément d'adresse",
    muiType: 'string',
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().max(128, "Le complément d'adresse ne peut pas faire plus de 128 caractères"),
  },
  {
    name: 'zipCode',
    placeholder: 'Code postal',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Code postal',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 2,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le code postal est requis')
      .min(4, 'Le code postal ne peut pas faire moins de 4 caractères')
      .max(12, 'Le code postal ne peut pas faire plus de 12 caractères'),
  },
  {
    name: 'city',
    placeholder: 'Ville',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Ville',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('La ville est requise')
      .min(2, 'La ville ne peut pas faire moins de 2 caractères')
      .max(64, 'La ville ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'country',
    placeholder: 'Country',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Country',
    muiType: 'string',
    muiMdSize: 6,
    muiFlex: 2,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le pays est requis')
      .min(2, 'Le pays ne peut pas faire moins de 2 caractères')
      .max(64, 'Le pays ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'tel',
    placeholder: '06 01 02 03 04',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Tel',
    muiType: 'string',
    muiFlex: 1.5,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string(),
  },
  {
    name: 'iban',
    title: 'IBAN à renseigner sans espaces via la partie admin!',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'IBAN',
    muiType: 'string',
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
    name: 'amount',
    placeholder: 'Montant actif',
    type: 'number',
    initialValue: 0,
    muiHeaderName: 'Montant actif',
    muiType: 'number',
    muiFlex: 1,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: false,
    yupValidations: number().nullable(true),
  },
  {
    name: 'status',
    placeholder: 'Statut',
    type: 'text',
    initialValue: 'pending',
    muiHeaderName: 'Statut',
    muiType: 'singleSelect',
    muiMdSize: 6,
    selectOptions: [
      {
        value: 'pending',
        label: "Demande d'abonnement",
      },
      { value: 'subscribed', label: 'Abonné' },
      { value: 'requestForCancellation', label: 'Demande résiliation' },
      { value: 'cancelled', label: 'Résilié' },
      { value: 'newAmountAsked', label: 'Demande changement montant' },
    ],
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Statut requis'),
  },
  {
    name: 'amountAsked',
    placeholder: 'Montant demandé',
    type: 'number',
    initialValue: 0,
    muiHeaderName: 'Montant demandé',
    muiType: 'number',
    muiFlex: 2,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: false,
    yupValidations: number().nullable(true),
  },
  {
    name: 'createdAt',
    placeholder: 'Date',
    type: 'date',
    disabled: true,
    initialValue: new Date(),
    fullWidth: false,
    muiHeaderName: 'Date',
    muiType: 'date',
    muiFlex: 2,
    muiMdSize: 6,
    muiHidden: true,
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required('Date requise'),
  },
  {
    name: 'comment',
    placeholder: 'Commentaire',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Commentaire',
    muiType: 'string',
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string(),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const SubscriptionModel = generateMongooseModel('Subscription', subscriptionSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const subscriptionsColumns = (handleDelete) => generateColumns(subscriptionSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const SubscriptionFormik = ({ id, title, children }) =>
  generateFormik(subscriptionSchema, 'subscriptions', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const subscriptionsAPIHandler = generateCollectionApiHandler(SubscriptionModel);
export const subscriptionAPIHandler = generateElementApiHandler(SubscriptionModel);

//* --------
//* Datagrid
//* --------

export const SubscriptionsDatagrid = () => (
  <CustomDatagrid schema={subscriptionSchema} title='Abonnements' endpoint='subscriptions' />
);
