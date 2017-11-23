import React from "react";
import fetch from "isomorphic-unfetch";
import BaseLayout from "../BaseLayout";

import * as types from "../../server/lib/config/types";

const BasePage = function (Page) {
    return class Base extends React.Component {

        static propTypes = {
            user: types.User
        }

        static async getInitialProps(context) {
            if (Page.getInitialProps) {
                const userRes = await fetch("http://127.0.0.1:3000/api/qraphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        query: "{ name, id }"
                    })
                });
                const user = await userRes.json();
                return Page.getInitialProps({user: user.data});
            }
            return {user: {}};
        }

        render() {
            return (
                <BaseLayout user={this.props.user}>
                    <Page {...this.props} />
                </BaseLayout>
            );
        }
    };
};

export default BasePage;
