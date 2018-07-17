import { connect } from "react-redux";
import DiscussionComponent from "../../ui/Message/Discussion";
import {
    fetchCurrentDiscussion,
} from "../../actions/message";

export const mapStateToProps = state => ({
    message: state.message,
    user: state.user,
});

export const mapDispatchToProps = dispatch => ({
    onInit(userId) {
        dispatch(fetchCurrentDiscussion(userId));
    },
});

const Discussion = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DiscussionComponent);

export default Discussion;
