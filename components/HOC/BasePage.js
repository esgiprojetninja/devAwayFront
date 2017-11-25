import React from 'react';
// import fetch from 'isomorphic-unfetch';
import BaseLayout from '../BaseLayout';

import * as types from '../../server/lib/config/types';

const BasePage = function (Page) {
    return class Base extends React.Component {
        static propTypes = {
            user: types.User
        }
        // Added 'context' prop to return statement (unused var error without it)
        static async getInitialProps(context) {
            if (Page.getInitialProps) {
                // const query = await fetch("http://127.0.0.1:3000/api/me", {
                //     method: "POST",
                //     headers: {
                //         "Content-Type": "application/json"
                //     },
                //     body: JSON.stringify({
                //         query: `{
                //             id
                //             name
                //         }`
                //     })
                // });
                // const res = await query.json();
                // return Page.getInitialProps({user: res.data});
                return { user: {}, context };
            }
            return { user: {}, context };
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
