import { generateMongooseModel } from '@/lib/generators/generateMongooseModel';
import { generateColumns } from '@/lib/generators/generateColumns';
import { generateCollectionApiHandler } from '@/lib/generators/generateCollectionApiHandler';
import { generateElementApiHandler } from '@/lib/generators/generateElementApiHandler';
import { bool, string } from 'yup';
import { generateFormik } from '@/lib/generators/generateFormik';
import CustomDatagrid from '@/components/datagrid/CustomDatagrid';
import { Cancel, CheckCircle } from '@mui/icons-material';

//* General schema definition
export const helpContentSchema = [
  {
    name: 'firstText',
    placeholder: 'Premier texte',
    type: 'text',
    title: 'Haut de page',
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
    muiHeaderName: 'Premier texte (EN)',
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
    name: 'enFirstText',
    placeholder: 'Premier texte (italien)',
    translation: true,
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Premier texte (IT)',
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
    name: 'kitContent',
    placeholder: `Contenu du kit - séparés par ";"`,
    type: 'text',
    initialValue: '',
    title: 'Kit Wink',
    muiHeaderName: `Contenu du kit - séparés par ";"`,
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le contenu du kit est requis')
      .min(3, 'Le contenu du kit ne peut pas faire moins de 3 caractères')
      .max(256, 'Le contenu du kit ne peut pas faire plus de 256 caractères'),
  },
  {
    name: 'enKitContent',
    placeholder: `Contenu du kit - séparés par ";" (anglais)`,
    translation: true,
    type: 'text',
    initialValue: '',
    muiHeaderName: `Contenu du kit - séparés par ";" (anglais)`,
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le contenu du kit en anglais est requis')
      .min(3, 'Le contenu du kit en anglais ne peut pas faire moins de 3 caractères')
      .max(256, 'Le contenu du kit en anglais ne peut pas faire plus de 256 caractères'),
  },
  {
    name: 'itKitContent',
    placeholder: `Contenu du kit - séparés par ";" (italien)`,
    translation: true,
    type: 'text',
    initialValue: '',
    muiHeaderName: `Contenu du kit - séparés par ";" (italien)`,
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le contenu du kit en italien est requis')
      .min(3, 'Le contenu du kit en italien ne peut pas faire moins de 3 caractères')
      .max(256, 'Le contenu du kit en italien ne peut pas faire plus de 256 caractères'),
  },
  {
    name: 'isActiveKit',
    type: 'checkbox',
    label: 'Kit actif',
    initialValue: true,
    muiHeaderName: 'Kit actif',
    muiType: 'boolean',
    muiFlex: 1.5,
    muiRenderCell: (params) =>
      params.row.priority ? (
        <CheckCircle sx={{ color: 'green', fontSize: '2rem' }} />
      ) : (
        <Cancel sx={{ color: 'red', fontSize: '2rem' }} />
      ),
    mongooseType: Boolean,
    mongooseRequired: true,
    yupValidations: bool().required('Le statut du kit est requis'),
  },
  {
    name: 'imageUrl',
    placeholder: "URL de l'image 1",
    type: 'text',
    initialValue: '',
    title: 'Images',
    muiHeaderName: 'Image 1',
    muiType: 'string',
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image 1 est requis").url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl2',
    placeholder: "URL de l'image 2",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 2',
    muiType: 'string',
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image 2 est requis").url('Entrez un URL valide'),
  },
  {
    name: 'imageUrl3',
    placeholder: "URL de l'image 3",
    type: 'text',
    initialValue: '',
    muiHeaderName: 'Image 3',
    muiType: 'string',
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image 3 est requis").url('Entrez un URL valide'),
  },
  {
    name: 'secondText',
    placeholder: 'Second texte',
    type: 'text',
    multiline: true,
    title: 'Bas de page',
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
    name: 'formText',
    placeholder: 'Texte du formulaire',
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Texte du formulaire',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le texte du formulaire est requis')
      .min(120, 'Le texte du formulaire ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le texte du formulaire ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'enFormText',
    placeholder: 'Texte du formulaire (anglais)',
    translation: true,
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Texte du formulaire (IT)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le texte du formulaire en anglais est requis')
      .min(120, 'Le texte du formulaire en anglais ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le texte du formulaire en anglais ne peut pas faire plus de 3000 caractères'),
  },
  {
    name: 'itFormText',
    placeholder: 'Texte du formulaire (italien)',
    translation: true,
    type: 'text',
    multiline: true,
    minRows: 4,
    initialValue: '',
    muiHeaderName: 'Texte du formulaire (IT)',
    muiType: 'string',
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required('Le texte du formulaire en italien est requis')
      .min(120, 'Le texte du formulaire en italien ne peut pas faire moins de 120 caractères')
      .max(3000, 'Le texte du formulaire en italien ne peut pas faire plus de 3000 caractères'),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const HelpContentModel = generateMongooseModel('HelpContent', helpContentSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const helpContentsColumns = (handleDelete) => generateColumns(helpContentSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const HelpContentFormik = ({ id, title, children }) =>
  generateFormik(helpContentSchema, 'helpContents', title, id, 'volunteers')({ children });

//* ------------
//* API Handlers
//* ------------

export const helpContentsAPIHandler = generateCollectionApiHandler(HelpContentModel);
export const helpContentAPIHandler = generateElementApiHandler(HelpContentModel);

//* --------
//* Datagrid
//* --------

export const HelpContentsDatagrid = () => (
  <CustomDatagrid schema={helpContentSchema} title='HelpContents' endpoint='helpContents' />
);
