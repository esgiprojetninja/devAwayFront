import { connect } from "react-redux";

import {
    updateCredentials,
    checkGuard
} from "../actions/guard";

import GuardComponent from "../ui/Guard.jsx";

const mapStateToProps = (state) => {
    return state.guard;
};

const mapDispatchToProps = dispatch => ({
    onCredentialChange: (property, value) => dispatch(updateCredentials(property, value)),
    onFormSubmit: () => dispatch(checkGuard())
});

const Guard = connect(
    mapStateToProps,
    mapDispatchToProps
)(GuardComponent);

export default Guard;
