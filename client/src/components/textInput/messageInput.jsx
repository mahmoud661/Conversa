import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { TextField } from "@mui/material";
import "../../App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#172D4",
    },
  },
});

export default function MessageText({ onChange }) {
  return (
    <ThemeProvider theme={theme}>
      <TextField id="filled-basic" label="Filled" variant="filled" onChange={onChange}  />
    </ThemeProvider>
  );
}
