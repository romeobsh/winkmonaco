import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { bool, string } from 'yup';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';

//* General schema definition
export const partnerSchema = [
  {
    name: 'firstText',
    placeholder: 'Premier texte',
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Premier texte',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le premier texte est requis')
      .min(120, 'Le premier texte ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le premier texte ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'enFirstText',
    placeholder: 'Premier texte (anglais)',
    translation: true,
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Premier texte',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le premier texte en anglais est requis')
      .min(120, 'Le premier texte en anglais ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le premier texte en anglais ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'itFirstText',
    placeholder: 'Premier texte (italien)',
    translation: true,
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Premier texte',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le premier texte en italien est requis')
      .min(120, 'Le premier texte en italien ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le premier texte en italien ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'imageUrl',
    placeholder: "URL de l'image 1",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 1',
    muiType: 'string',
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image 1 est requis").url('Entrez un URL valide'),
  },
  {
    name: 'secondText',
    placeholder: 'Second texte',
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Second texte',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le second texte est requis')
      .min(120, 'Le second texte ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le second texte ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'enSecondText',
    placeholder: 'Second texte (anglais)',
    translation: true,
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Second texte (EN)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le second texte en anglais est requis')
      .min(120, 'Le second texte en anglais ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le second texte en anglais ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'itSecondText',
    placeholder: 'Second texte (italien)',
    translation: true,
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Second texte (IT)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le second texte en italien est requis')
      .min(120, 'Le second texte en italien ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le second texte en italien ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'imageUrl2',
    placeholder: "URL de l'image 2",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 2',
    muiType: 'string',
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl3',
    placeholder: "URL de l'image 3",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 3',
    muiType: 'string',
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl4',
    placeholder: "URL de l'image 4",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 4',
    muiType: 'string',
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().url('Entrez un URL valide'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const PartnerModel = generateMongooseModel('Partner', partnerSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const partnersColumns = (handleDelete) => generateColumns(partnerSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const PartnerFormik = ({ id, title, children }) =>
  generateFormik(partnerSchema, 'partners', title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const partnersAPIHandler = generateCollectionApiHandler(PartnerModel);
export const partnerAPIHandler = generateElementApiHandler(PartnerModel);

//* --------
//* Datagrid
//* --------

export const PartnersDatagrid = () => <CustomDatagrid schema={partnerSchema} title='Partners' endpoint='partners' />;
