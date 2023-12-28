import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { string } from 'yup';

//* General model definition
export const contactSchema = [
  {
    name: 'fullName',
    placeholder: 'Nom complet',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Nom complet',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required('Le nom complet est requis'),
  },
  {
    name: 'frTel',
    placeholder: '06 01 02 03 04',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Téléphone - Format français (06 01 02 03 04)',
    muiType: 'string',
    muiFlex: 4,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le numéro de téléphone (FR) est requis')
      .matches(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Entrez un numéro de téléphone (FR) valide'),
  },
  {
    name: 'internationalTel',
    placeholder: '+33 6 01 02 03 04',
    type: 'text',
    initialValue: '',
    translation: true,
    muiMdSize: 6,
    muiHeaderName: 'Téléphone - Format international (+33 6 01 02 03 04)',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le numéro de téléphone (format international) est requis')
      .matches(/^\+(?:[0-9] ?){6,14}[0-9]$/, 'Entrez un numéro de téléphone (format international) valide'),
  },
  {
    name: 'email',
    placeholder: 'Adresse e-mail',
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Adresse e-mail',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'adresse e-mail est requise").email('Entrez une adresse e-mail valide'),
  },
  {
    name: 'profilePic',
    placeholder: 'URL de la photo de profil',
    title: "Lien à compléter: https://drive.google.com/uc?export=view&id=[ID DE L'IMAGE]",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'URL de la photo de profil',
    muiType: 'string',
    muiFlex: 4,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de la photo de profil est requise").url('Entrez une URL valide'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const ContactModel = generateMongooseModel('Contact', contactSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const contactsColumns = generateColumns(contactSchema);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const ContactFormik = ({ id, title, children }) =>
  generateFormik(contactSchema, 'contacts', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const contactsAPIHandler = generateCollectionApiHandler(ContactModel);
export const contactAPIHandler = generateElementApiHandler(ContactModel);

//* --------
//* Datagrid
//* --------

// export const ContactsDatagrid = () => <CustomDatagrid schema={contactSchema} title='Contacts' endpoint='contacts' />;
