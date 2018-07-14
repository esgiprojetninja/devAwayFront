import * as T from "prop-types";

export default T.shape({
    title: T.shape({
        min: T.number.isRequired,
        max: T.number.isRequired,
    }).isRequired,
    description: T.shape({
        min: T.number.isRequired,
        max: T.number.isRequired,
    }).isRequired,
    checkinDate: T.shape({
        min: T.shape({ format: T.func.isRequired }).isRequired,
        isDate: T.bool.isRequired,
    }).isRequired,
    stayTime: T.shape({
        min: T.number.isRequired,
        max: T.number.isRequired,
    }).isRequired,
    stayTimeUnit: T.shape({
        values: T.arrayOf(T.shape({
            label: T.string.isRequired,
            value: T.number.isRequired,
        })).isRequired,
        isSelect: T.bool.isRequired,
    }).isRequired,
    accommodation_id: T.shape({
        values: T.arrayOf(T.shape({
            label: T.string.isRequired,
            value: T.number.isRequired,
        })).isRequired,
        isSelect: T.bool.isRequired,
    }).isRequired,
});
