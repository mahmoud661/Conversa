import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import "../../style/App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#172D9",
    },
  },
});

export default function AddButton({ onClick }) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClick}
        variant="contained"
       
        
      >
        Add
      </Button>
    </ThemeProvider>
  );
}
