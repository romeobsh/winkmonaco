import { generateMongooseModel } from "@/lib/generators/generateMongooseModel";
import { generateColumns } from "@/lib/generators/generateColumns";
import { generateCollectionApiHandler } from "@/lib/generators/generateCollectionApiHandler";
import { generateElementApiHandler } from "@/lib/generators/generateElementApiHandler";
import { string, number, bool } from "yup";
import { generateFormik } from "@/lib/generators/generateFormik";
import CustomDatagrid from "@/components/datagrid/CustomDatagrid";
import { Cancel, CheckCircle } from "@mui/icons-material";

//* General schema definition
export const productSchema = [
  {
    name: "name",
    placeholder: "Nom du produit",
    type: "text",
    initialValue: "",
    muiHeaderName: "Produit",
    muiType: "string",
    muiFlex: 3,
    muiMdSize: 6,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("Nom du produit requis")
      .min(3, "Le nom du produit ne peut pas faire moins de 6 caractères")
      .max(64, "Le nom du produit ne peut pas faire plus de 64 caractères"),
  },
  {
    name: "description",
    placeholder: "Description",
    type: "text",
    multiline: true,
    initialValue: "",
    muiHeaderName: "Description",
    muiType: "string",
    muiFlex: 3,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string()
      .required("La description est requise")
      .min(32, "La description ne peut pas faire moins de 120 caractères")
      .max(256, "La description ne peut pas faire plus de 3000 caractères"),
  },
  {
    name: "price",
    placeholder: "Price",
    type: "number",
    initialValue: 0,
    muiHeaderName: "Price",
    muiType: "number",
    muiFlex: 1,
    muiMdSize: 6,
    mongooseType: Number,
    mongooseRequired: true,
    yupValidations: number().required("Prix du produit requis").positive("Le prix ne peut pas être négatif"),
  },
  {
    name: "sizes",
    placeholder: `Tailles disponibles - séparées par ";"`,
    type: "text",
    initialValue: "",
    muiHeaderName: "Tailles",
    muiType: "string",
    muiFlex: 2,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string(),
  },
  {
    name: "isActive",
    type: "checkbox",
    label: "Actif",
    initialValue: true,
    muiHeaderName: "Actif",
    muiType: "boolean",
    muiFlex: 1.5,
    muiRenderCell: (params) =>
      params.row.priority ? <CheckCircle sx={{ color: "green", fontSize: "2rem" }} /> : <Cancel sx={{ color: "red", fontSize: "2rem" }} />,
    mongooseType: Boolean,
    mongooseRequired: true,
    yupValidations: bool().required("Le statut du produit est requis"),
  },
  {
    name: "imageUrl",
    placeholder: "URL de l'image 1",
    type: "text",
    initialValue: "",
    muiHeaderName: "Image 1",
    muiType: "string",
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: true,
    yupValidations: string().required("L'URL de l'image 1 est requis").url("Entrez un URL valide"),
  },
  {
    name: "imageUrl2",
    placeholder: "URL de l'image 2",
    type: "text",
    initialValue: "",
    muiHeaderName: "Image 2",
    muiType: "string",
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().url("Entrez un URL valide"),
  },
  {
    name: "imageUrl3",
    placeholder: "URL de l'image 3",
    type: "text",
    initialValue: "",
    muiHeaderName: "Image 3",
    muiType: "string",
    muiFlex: 1,
    mongooseType: String,
    mongooseRequired: false,
    yupValidations: string().url("Entrez un URL valide"),
  },
];

//* --------------------------
//* Creation of Mongoose Model
//* --------------------------

export const Product = generateMongooseModel("Product", productSchema);

//* ------------------------------
//* MUI DataGrid column definition
//* ------------------------------

export const productsColumns = (handleDelete) => generateColumns(productSchema, handleDelete);

//* ----------------------
//* Formik & Form creation
//* ----------------------

export const ProductFormik = ({ id, title, children }) => generateFormik(productSchema, "products", title, id)({ children });

//* ------------
//* API Handlers
//* ------------

export const productsAPIHandler = generateCollectionApiHandler(Product);
export const productAPIHandler = generateElementApiHandler(Product);

//* --------
//* Datagrid
//* --------

export const ProductsDatagrid = () => <CustomDatagrid schema={productSchema} title='Produits' endpoint='products' />;
