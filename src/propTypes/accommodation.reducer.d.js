import * as T from "prop-types";

export const accommodationReducerShape = {
    data: T.arrayOf(T.number).isRequired,
    byID: T.object.isRequired,
    isLoading: T.bool.isRequired,
    hasError: T.bool.isRequired,
    errorText: T.string,
    search: T.shape({
        all: T.arrayOf(T.any),
        hasPrevious: T.bool.isRequired,
        hasNext: T.bool.isRequired,
        isLoading: T.bool.isRequired,
        error: T.string.isRequired,
        lastSearchDate: T.string,
    })
};
export const accommodationReducerPropTypes = T.shape(accommodationReducerShape);
