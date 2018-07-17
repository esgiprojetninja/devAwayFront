/* global */
import { connect } from "react-redux";
import MessageListComponent from "../../ui/Message/MessageList";

export const mapStateToProps = state => ({ message: state.message });

export const mapDispatchToProps = () => ({
    onInit() {
        console.log("COUCOU INIT MMESSAGE LIST");
    }
});

const MessageList = connect(
    mapStateToProps,
    mapDispatchToProps,
)(MessageListComponent);

export default MessageList;
