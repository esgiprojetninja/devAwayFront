/* global */
import { connect } from "react-redux";
import MessageListComponent from "../../ui/Message/MessageList";
import {
    fetchCurrentIfConnected,
    fetchAllMessages,
    fetchTravellerMessages,
    fetchOwnerMessages,
} from "../../actions/message";

export const mapStateToProps = state => ({
    message: state.message,
    user: state.user,
    isLoggedIn: state.user.isLoggedIn
});

export const mapDispatchToProps = dispatch => ({
    onInit(filter) {
        dispatch(fetchCurrentIfConnected(filter));
    },
    allFetch() {
        dispatch(fetchAllMessages());
    },
    ownerFetch() {
        dispatch(fetchOwnerMessages());
    },
    travellerFetch() {
        dispatch(fetchTravellerMessages());
    },
});

const MessageList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageListComponent);

export default MessageList;
