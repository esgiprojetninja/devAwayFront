import * as T from "prop-types";

export const accommodationShape = {
    title: T.string,
    id: T.number,
    city: T.string,
    region: T.string,
    country: T.string,
    hasInternet: T.bool,
    description: T.string
};
export const accommodationPropTypes = T.shape(accommodationShape);
