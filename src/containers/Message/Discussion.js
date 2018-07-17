import { connect } from "react-redux";
import DiscussionComponent from "../../ui/Message/Discussion";
import {
    fetchCurrentDiscussion,
    sendMessage,
} from "../../actions/message";

export const mapStateToProps = state => ({
    message: state.message,
    user: state.user,
});

export const mapDispatchToProps = dispatch => ({
    onInit(userId) {
        dispatch(fetchCurrentDiscussion(userId));
    },
    sendMsg(msg, userId) {
        return dispatch(sendMessage(msg, userId));
    },
});

const Discussion = connect(
    mapStateToProps,
    mapDispatchToProps,
)(DiscussionComponent);

export default Discussion;
