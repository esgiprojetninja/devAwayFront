import BasePage from "../app/components/HOC/BasePage";
import React from "react";
import * as types from "../app/config/types";

class Index extends React.Component {

    static getInitialProps(context) {
        return {
            user: context.user
        };
    }

    render() {
        return (
            <h1>{ this.props.user.displayName }</h1>
        );
    }
}

Index.propTypes = {
    user: types.User
};

export default BasePage(Index);
