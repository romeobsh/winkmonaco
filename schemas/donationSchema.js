import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { bool, date, number, string } from 'yup';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { Cancel, CheckCircle } from '@mui/icons-material';

//* General schema definition
export const donationSchema = [
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
    muiFlex: 2,
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
    muiFlex: 2,
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
    muiFlex: 2,
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
    muiFlex: 2,
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
    muiFlex: 3,
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
    muiFlex: 3,
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
    muiFlex: 3,
    muiHidden: true,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le pays est requis')
      .min(2, 'Le pays ne peut pas faire moins de 2 caractères')
      .max(64, 'Le pays ne peut pas faire plus de 64 caractères'),
  },
  {
    name: 'amount',
    placeholder: 'Montant',
    type: 'number',
    initialValue: 0,
    muiHeaderName: 'Montant',
    muiType: 'number',
    muiFlex: 1,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: true,
    yupValidations: number().required('Montant du don requis').positive('Le montant ne peut pas être négatif'),
  },
  {
    name: 'type',
    placeholder: 'Type',
    type: 'text',
    initialValue: 'cb',
    muiHeaderName: 'Type',
    muiType: 'singleSelect',
    muiMdSize: 6,
    selectOptions: [
      {
        value: 'virement',
        label: 'Virement',
      },
      { value: 'liquide', label: 'Liquide' },
      { value: 'cb', label: 'CB' },
      { value: 'cheque', label: 'Chèque' },
      { value: 'subscription', label: 'Virement (abonnement)' },
    ],
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Type requis'),
  },
  {
    name: 'isPaid',
    type: 'checkbox',
    label: 'Don finalisé',
    initialValue: false,
    muiHeaderName: 'Don finalisé',
    muiType: 'boolean',
    muiFlex: 1.5,
    muiRenderCell: (params) =>
      params.row.isPaid ? (
        <CheckCircle sx={{ color: 'green', fontSize: '2rem' }} />
      ) : (
        <Cancel sx={{ color: 'red', fontSize: '2rem' }} />
      ),
    mongooseType: Boolean,
    mongooseRequired: true,
    yupValidations: bool().required('Requis'),
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
    mongooseType: Date,
    mongooseRequired: true,
    yupValidations: date().required('Date requise'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const DonationModel = generateMongooseModel('Donation', donationSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const donationsColumns = (handleDelete) => generateColumns(donationSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const DonationFormik = ({ id, title, children }) =>
  generateFormik(donationSchema, 'donations', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const donationsAPIHandler = generateCollectionApiHandler(DonationModel);
export const donationAPIHandler = generateElementApiHandler(DonationModel);

//* --------
//* Datagrid
//* --------

export const DonationsDatagrid = () => (
  <CustomDatagrid
    schema={donationSchema}
    sorting={{
      sortModel: [{ field: 'createdAt', sort: 'desc' }],
    }}
    title='Donations'
    endpoint='donations'
  />
);
