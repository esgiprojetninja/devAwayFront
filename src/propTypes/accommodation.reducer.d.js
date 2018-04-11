import * as T from "prop-types";

export const accommodationReducerShape = {
    data: T.arrayOf(T.string).isRequired,
    byID: T.object.isRequired,
    isLoading: T.bool.isRequired,
    hasError: T.bool.isRequired,
    errorText: T.string
};
export const accommodationReducerPropTypes = T.shape(accommodationReducerShape);
