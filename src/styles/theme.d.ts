import { Theme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    palette: {
      primary: {
        light: string;
        dark: string;
        main: string;
      };
      secondary: {
        light: string;
        dark: string;
        main: string;
      };
      common: {
        white: string;
        black: string;
      };
    };
  }
}
