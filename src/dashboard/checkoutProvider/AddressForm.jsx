import Checkbox from "@mui/material/Checkbox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";
import { MenuItem, Select } from "@mui/material";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

const theme = createTheme({
  components: {
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#F9F0FF",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#F9F0FF",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F9F0FF",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F9F0FF",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#F9F0FF",
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          color: "#F9F0FF",
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          color: "#F9F0FF",
          "&.Mui-checked": {
            color: "#F9F0FF",
          },
        },
      },
    },
  },
});

export default function AddressForm() {
  return (
    <ThemeProvider theme={theme}>
      <Grid container spacing={3} sx={{ color: "#F9F0FF" }}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="first-name"
            type="name"
            placeholder="John"
            autoComplete="first name"
            required
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="last-name"
            type="last-name"
            placeholder="Snow"
            autoComplete="last name"
            required
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address1" required>
            Address line 1
          </FormLabel>
          <OutlinedInput
            id="address1"
            name="address1"
            type="address1"
            placeholder="Street name and number"
            autoComplete="shipping address-line1"
            required
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address2">Address line 2</FormLabel>
          <OutlinedInput
            id="address2"
            name="address2"
            type="address2"
            placeholder="Apartment, suite, unit, etc. (optional)"
            autoComplete="shipping address-line2"
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <OutlinedInput
            id="city"
            name="city"
            type="city"
            placeholder="New York"
            autoComplete="City"
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="state" required>
            State
          </FormLabel>
          <OutlinedInput
            id="state"
            name="state"
            type="state"
            placeholder="NY"
            autoComplete="State"
            required
            inputComponent={({ inputRef, ...props }) => (
              <Select
                inputRef={inputRef}
                {...props}
                defaultValue=""
              >
                <MenuItem value="NY">New York</MenuItem>
                <MenuItem value="CA">California</MenuItem>
                <MenuItem value="TX">Texas</MenuItem>
              </Select>
            )}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <OutlinedInput
            id="zip"
            name="zip"
            type="zip"
            placeholder="12345"
            autoComplete="shipping postal-code"
            required
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <OutlinedInput
            id="country"
            name="country"
            type="country"
            placeholder="United States"
            autoComplete="shipping country"
            required
            inputComponent={({ inputRef, ...props }) => (
              <Select
                inputRef={inputRef}
                {...props}
                defaultValue=""
              >
                <MenuItem value="NY">United States</MenuItem>
                <MenuItem value="CA">England</MenuItem>
                <MenuItem value="TX">Italy</MenuItem>
              </Select>
            )}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormControlLabel
            control={<Checkbox name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </FormGrid>
      </Grid>
    </ThemeProvider>
  );
}
