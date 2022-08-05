import Proptypes from 'prop-types';
import moment from 'moment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#007FFF',
    },
    secondary: {
      main: '#6B7280',
    },
    error: {
      main: '#EF4444',
    },
    warning: {
      main: '#F59E0B',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#3B82F6',
    },
    success: {
      main: '#14B8A6',
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
    background: {
      default: '#FFFFFF',
    },
    action: {
      active: '#6B7280',
      hover: '#F3F4F6',
      selected: '#E5E7EB',
      disabled: '#9CA3AF',
      disabledBackground: '#E5E7EB',
      focus: '#E5E7EB',
    },
    divider: '#D1D5DB',
    grey: {
      50: '#F9FAFb',
      100: '#F3F4F6',
      200: '#E5E7Eb',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
      A100: '#F3F4F6',
      A200: '#E5E7Eb',
      A400: '#9CA3AF',
      A700: '#374151',
    },
  },
  shadows: [
    'none',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.1), 0 0 10px rgba(0 0 0 / 0.1)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
    '0 3px 5px rgb(0 0 0 / 0.05)',
  ],
  typography: {
    fontFamily: ['"Spoqa Han Sans Neo"', 'sans-serif'].join(','),
    fontSize: 16,
    h1: {
      fontWeight: '700',
      fontSize: '3rem', // 48px
      lineHeight: '3.5rem', // 56px
      letterSpacing: '0',
    },
    h2: {
      fontWeight: '700',
      fontSize: '2.25rem', // 36px
      lineHeight: '2.75rem', // 44px
      letterSpacing: '0',
    },
    h3: {
      fontWeight: '700',
      fontSize: '1.75rem', // 28px
      lineHeight: '2.25rem', // 36px
      letterSpacing: '0',
    },
    h4: {
      fontWeight: '700',
      fontSize: '1.25rem', // 20px
      lineHeight: '1.75rem', // 28px
      letterSpacing: '0',
    },
    h5: {
      fontWeight: '700',
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      letterSpacing: '0',
    },
    h6: {
      fontWeight: '700',
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5rem', // 20px
      letterSpacing: '0',
    },
    subtitle1: {
      fontWeight: '500',
      fontSize: '1rem', // 16px
      lineHeight: '1.75rem', // 28px
      letterSpacing: '0',
    },
    subtitle2: {
      fontWeight: '500',
      fontSize: '0.875rem', // 14px
      lineHeight: '1.5rem', // 24px
      letterSpacing: '0',
    },
    body1: {
      fontWeight: '400',
      fontSize: '1rem', // 16px
      lineHeight: '1.5rem', // 24px
      letterSpacing: '0',
    },
    body2: {
      fontWeight: '400',
      fontSize: '0.875rem', // 14px
      lineHeight: '1.25rem', // 20px
      letterSpacing: '0',
    },
    button: {
      fontWeight: '500',
      fontSize: '0.875rem', // 14px
      lineHeight: '0.875rem', // 14px
      letterSpacing: '0',
    },
    caption: {
      fontWeight: '400',
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      letterSpacing: '0',
    },
    overline: {
      fontWeight: '400',
      fontSize: '0.75rem', // 12px
      lineHeight: '1rem', // 16px
      letterSpacing: '0',
    },
  },
  shape: {
    borderRadius: '0.5rem',
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.text.primary,
        }),
      },
    },
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'large',
      },
      styleOverrides: {
        sizeSmall: {
          padding: '10px 8px',
          fontSize: '12px',
          lineHeight: '1',
        },
        sizeMedium: {
          padding: '13px 12px',
          fontSize: '14px',
          lineHeight: '1',
        },
        sizeLarge: {
          padding: '16px',
          fontSize: '16px',
          lineHeight: '1',
        },
        outlinedSizeSmall: {
          padding: '9px 7px',
        },
        outlinedSizeMedium: {
          padding: '12px 11px',
        },
        outlinedSizeLarge: {
          padding: '15px',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          width: '24px',
          heihgt: '24px',
          fontSize: '24px',
        },
        fontSizeSmall: {
          width: '16px',
          heihgt: '16px',
          fontSize: '16px',
        },
        fontSizeLarge: {
          width: '40px',
          heihgt: '40px',
          fontSize: '40px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation: ({ theme }) => ({
          boxShadow: theme.shadows[2],
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minWidth: '64px',
          padding: '13px 16px',
          fontSize: '14px',
          lineHeight: '1',
        },
      },
    },
    MuiChip: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
        },
        label: {
          fontSize: '12px',
          lineHeight: '1',
          padding: '8px 14px',
        },
        labelSmall: {
          fontSize: '12px',
          lineHeight: '1',
          padding: '6px 12px',
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '16px',
          lineHeight: '24px',
          transform: 'translate(14px, 12px) scale(1)',
        },
        sizeSmall: {
          fontSize: '14px',
          lineHeight: '20px',
          transform: 'translate(14px, 10px) scale(1)',
        },
        shrink: {
          transform: 'translate(14px, -9px) scale(0.75)',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          padding: '12px 16px',
        },
        sizeSmall: {
          padding: '8px 16px',
        },
        input: {
          minHeight: '24px',
          padding: '0',
          borderRadius: '0',
          fontSize: '16px',
          lineHeight: '24px',
        },
        inputSizeSmall: {
          padding: '0',
        },
        multiline: {
          lineHeight: '24px',
        },
        notchedOutline: ({ theme }) => ({
          border: `1px solid ${theme.palette.divider}`,
        }),
      },
    },
    MuiDatePicker: {
      defaultProps: {
        disablePast: true,
        inputFormat: 'YYYY-MM-DD',
        minDate: moment(),
        closeOnSelect: true,
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.grey[300],
          color: theme.palette.common.white,
          fontSize: '16px',
        }),
      },
    },
    MuiAvatarGroup: {
      defaultProps: {
        max: 4,
      },
      styleOverrides: {
        root: {
          padding: '0 8px',
          alignItems: 'center',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        avatar: {
          marginRight: '0.5rem',
        },
        subheader: {
          fontSize: '1rem',
          lineHeight: '1.5rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          '&:last-child': {
            paddingBottom: '1rem',
          },
        },
      },
    },
  },
});

export function MuiProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {children}
      </LocalizationProvider>
    </ThemeProvider>
  );
}

MuiProvider.propTypes = {
  children: Proptypes.node,
};
