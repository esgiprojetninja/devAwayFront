import React from "react";
import BasePage from "../components/HOC/BasePage";
import * as types from "../server/lib/config/types";

class Index extends React.Component {
    static getInitialProps(context) {
        return {
            user: context.user
        };
    }
    
    render() {
        return (
            <h1>Hello {this.props.user.displayName ? this.props.user.displayName : ""} !</h1>
        );
    }
}

Index.propTypes = {
    user: types.User
};

export default BasePage(Index);
