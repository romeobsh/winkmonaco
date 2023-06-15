//create custom theme for mui
import { createTheme } from "@mui/material";
import { frFR } from "@mui/x-data-grid";
import { frFR as coreFrFR } from "@mui/material/locale";

export const theme = createTheme(
  {
    root: {
      display: "flex",
      width: "100%",
      marginTop: 0,
      zIndex: 1,
      height: "100%",
      overflow: "hidden",
      maxWidth: "100%",
    },
    appFrame: {
      position: "relative",
      display: "flex",
      width: "100%",
      height: "100%",
      maxWidth: "100%",
    },
    palette: {
      primary: {
        main: "#60C7FA",
      },
      secondary: {
        main: "#E74C3C",
      },
    },
    typography: {
      fontFamily: "Montserrat, sans-serif",
      color: "#1C4057",
      h1: {
        fontSize: "2.75rem",
        lineHeight: "1.25",
        fontWeight: "800",
      },
      h2: {
        fontSize: "2.5rem",
        lineHeight: "1.25",
        fontWeight: "600",
        color: "#2F698F",
      },
      h5: {
        // lineHeight: 'unset',
      },
      h6: {
        fontSize: "1rem",
        lineHeight: "1.25",
        fontWeight: "600",
        color: "#1c1c1c",
      },
      body1: {
        fontWeight: "500",
        fontSize: "20px",
        lineHeight: "28.38px",
        color: "#1C4057",
      },
    },
    components: {
      MuiTable: {
        styleOverrides: {
          root: {},
        },
      },
      MuiTableCell: {
        variants: [
          {
            props: { variant: "head" },
            style: {
              fontWeight: "bold",
            },
          },
        ],
        styleOverrides: {
          root: {
            fontFamily: "Montserrat, sans-serif",
            padding: "6px 6px",
            whiteSpace: "nowrap",
            fontSize: "0.9rem",
            border: "none",
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            border: "1px solid lightgray",
          },
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          "*::-webkit-scrollbar": {
            width: "0.4em",
          },
          "*::-webkit-scrollbar-track": {
            WebkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.2)",
            borderRadius: "3px",
          },
          "*::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(0,0,0,.1)",
            borderRadius: "3px",
          },
          "*::-webkit-scrollbar-thumb:hover": {
            backgroundColor: "rgba(0,0,0,.2)",
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: "Montserrat, sans-serif",
            lineHeight: 1.25,
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": {
              color: "#2F698F",
            },
          },
        },
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            marginTop: "0.5rem",
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: "0.8rem",
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
        styleOverrides: {
          root: {
            border: "1px solid lightgray",
          },
        },
      },
      MuiGrid: {
        defaultProps: {
          spacing: 0,
        },
        styleOverrides: {
          root: {
            marginLeft: "0",
          },
          item: {
            paddingLeft: "0",
            paddingTop: "0",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          borderRadius: "10px",
          root: ({ ownerState }) => ({
            textTransform: "none",
            ...(ownerState.size === "medium" && {
              fontSize: "1rem",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
            }),
            ...(ownerState.color === "primary" &&
              ownerState.variant === "contained" && {
                color: "white",
              }),
          }),
        },
      },
      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: {
            variant: "h6",
            color: "#000",
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            "&:hover": {
              backgroundColor: "transparent",
              color: "#2F698F",
              "& .MuiListItemIcon-root": {
                color: "#2F698F",
              },
              "& .MuiListItemText-root .MuiTypography-root": {
                color: "#2F698F",
              },
            },
            "&.Mui-selected": {
              backgroundColor: "transparent",
              color: "#60C7FA",
              "& .MuiListItemIcon-root": {
                color: "#60C7FA",
              },
              "& .MuiListItemText-root .MuiTypography-root": {
                color: "#60C7FA",
              },
              "&:hover": {
                backgroundColor: "transparent",
              },
            },
          },
        },
      },
      MuiDataGrid: {
        defaultProps: {
          localeText: frFR,
        },
        styleOverrides: {
          root: {
            border: "0",
            color: "black",
            "& .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },
          },
          row: {},
          cell: {
            fontSize: "1rem",
            "&:focus-within": {
              outline: "1px solid gray",
            },
          },
          toolbarContainer: {
            padding: "0.5rem 0.25rem 0",
            "& .MuiButtonRoot": ({ ownerState }) => ({
              ...(ownerState.variant === "contained" && {
                color: "white",
              }),
              ...(ownerState.variant === "text" && {
                color: "#000",
              }),
            }),
          },
        },
      },
    },
  },
  frFR, // x-data-grid translations
  coreFrFR // core translations
);
