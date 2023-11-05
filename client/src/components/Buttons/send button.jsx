import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import "../../style/App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#172D4",
    },
  },
});

export default function SendButton({ onClick }) {
  return (
    <ThemeProvider theme={theme}>
      <Button
        onClick={onClick}
        variant="contained"
        size="small"
        endIcon={<SendIcon />}
      >
        Send
      </Button>
    </ThemeProvider>
  );
}
