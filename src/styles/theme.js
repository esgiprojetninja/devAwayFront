import { createMuiTheme } from "material-ui/styles";
import { amber } from "material-ui/colors";

const defaultMargin = "0.5em";

export const paper = {
    paperBox: {
        margin: defaultMargin
    }
};

export const boxes = {
    scrollBox: (maxHeight, unit) => ({
        maxHeight: `${maxHeight}${unit}`,
        overflowY: "auto"
    })
};

export const defaultTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#FE5858",
            main: "#E83232",
            dark: "#BE1414",
            contrastText: "#fff"
        },
        secondary: amber
    }
});
