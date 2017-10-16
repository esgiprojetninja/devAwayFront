import T from "prop-types";

export const show = T.shape({
    name: T.string,
    summary: T.string,
    image: T.shape({
        medium: T.string
    })
});

export const shows = T.arrayOf(show);
