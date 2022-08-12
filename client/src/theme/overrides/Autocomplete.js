// ----------------------------------------------------------------------

export default function Autocomplete(theme) {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '&:focus': {
            boxShadow: theme.customShadows.z20,
          },
        },
      },
    },
  };
}
