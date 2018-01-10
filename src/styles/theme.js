import { createMuiTheme } from "material-ui/styles";
import {
    blue,
    amber
} from "material-ui/colors";

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
        primary: blue,
        secondary: amber
    }
});
