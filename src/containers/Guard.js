import { connect } from "react-redux";

import {
    createGuard
} from "../actions/guard";

import GuardComponent from "../ui/Guard.jsx";

export const mapStateToProps = (state) => {
    return state.guard;
};

export const mapDispatchToProps = dispatch => ({
    onFormSubmit: () => dispatch(createGuard())
});

const Guard = connect(
    mapStateToProps,
    mapDispatchToProps
)(GuardComponent);

export default Guard;
