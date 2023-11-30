//create custom theme for mui
import { createTheme, responsiveFontSizes } from '@mui/material';
import { frFR } from '@mui/x-data-grid';
import { frFR as coreFrFR } from '@mui/material/locale';

const themeDefinition = createTheme(
  {
    root: {
      display: 'flex',
      width: '100%',
      marginTop: 0,
      zIndex: 1,
      height: '100%',
      overflow: 'hidden',
      maxWidth: '100%',
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 950,
        lg: 1200,
        xl: 1536,
      },
    },
    appFrame: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      height: '100%',
      maxWidth: '100%',
    },
    palette: {
      primary: {
        main: '#60C7FA',
      },
      secondary: {
        main: '#E74C3C',
      },
      text: {
        light: '#1C4057',
        main: '#1C4057',
        dark: '#1C4057',
        contrastText: 'rgba(0, 0, 0, 1)',
      },
    },
    typography: {
      color: 'text',
      h6: {
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
        fontWeight: 500,
      },
      h2: {
        fontWeight: 600,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*::-webkit-scrollbar': {
            width: '0.8em',
          },
          '*::-webkit-scrollbar-track': {
            WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.8)',
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.2)',
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0,0,0,0.1)',
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            color: '#1C4057',
            fontFamily: 'Nunito Sans, sans-serif',
            lineHeight: 1.5,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            fontFamily: 'Nunito Sans, sans-serif',
            lineHeight: 1.25,
            fontWeight: 600,
            textDecoration: 'none',
            '&:hover': {
              color: '#2F698F',
            },
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: '0.8rem',
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              backgroundColor: '#fff',
              fontFamily: "'Nunito Sans', sans-serif",
              borderRadius: '1.5rem',
            },
            '& .MuiFormLabel-root': {
              fontFamily: "'Nunito Sans', sans-serif",
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: {
          elevation: 2,
        },
        styleOverrides: {
          root: {
            border: '1px solid lightgray',
          },
        },
      },
      MuiGrid: {
        defaultProps: {
          spacing: 0,
          paddingLeft: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingTop: 0,
        },
        styleOverrides: {
          root: {
            marginLeft: '0',
          },
          item: {
            paddingLeft: '0',
            paddingTop: '0',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          borderRadius: '10px',
          root: ({ ownerState }) => ({
            textTransform: 'none',
            ...(ownerState.size === 'medium' && {
              fontSize: '1rem',
              fontFamily: 'Nunito Sans, sans-serif',
              fontWeight: 600,
            }),
            ...(ownerState.color === 'primary' &&
              ownerState.variant === 'contained' && {
                color: 'white',
              }),
          }),
        },
      },
      MuiListItemText: {
        defaultProps: {
          primaryTypographyProps: {
            variant: 'h6',
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '& .MuiListItemIcon-root': {
              color: '#1C4057',
              minWidth: '45px',
            },
            '&:hover': {
              backgroundColor: 'transparent',
              color: '#2F698F',
              '& .MuiListItemIcon-root': {
                color: '#2F698F',
              },
              '& .MuiListItemText-root .MuiTypography-root': {
                color: '#2F698F',
              },
            },
            '&.Mui-selected': {
              backgroundColor: 'transparent',
              color: '#60C7FA',
              '& .MuiListItemIcon-root': {
                color: '#60C7FA',
              },
              '& .MuiListItemText-root .MuiTypography-root': {
                color: '#60C7FA',
              },
              '&:hover': {
                backgroundColor: 'transparent',
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
            border: '0',
            color: 'black',
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 700,
            },
          },
          row: {},
          cell: {
            fontSize: '1rem',
            '&:focus-within': {
              outline: '1px solid gray',
            },
          },
          toolbarContainer: {
            padding: '0.5rem 0.25rem 0',
            '& .MuiButtonRoot': ({ ownerState }) => ({
              ...(ownerState.variant === 'contained' && {
                color: 'white',
              }),
              ...(ownerState.variant === 'text' && {
                color: '#000',
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

export const theme = responsiveFontSizes(themeDefinition);
