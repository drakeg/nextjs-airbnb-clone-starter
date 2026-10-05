import { defaultTheme, RaThemeOptions } from "react-admin";
import { merge } from "lodash";

export const theme: RaThemeOptions = merge({}, defaultTheme, {
  palette: {
    primary: { main: "#20a4f3" },
    secondary: { main: "#7950ed" },
    error: { main: "#e93c51" },
    warning: { main: "#f6aa50" },
    info: { main: "#144bc1" },
    success: { main: "#31c587" },
  },
});
