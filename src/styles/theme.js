const defaultMargin = "0.5em";
const defaultPadding = "0.5em";

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
