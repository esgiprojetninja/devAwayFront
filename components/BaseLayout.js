import Header from "./Header";
import React from "react";
import T from "prop-types";
import * as types from "../server/lib/config/types";
import Head from "next/head";

const BaseLayout = (props) => (
    <div>
        <Head>
            <title>Workaway</title>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="css/styles.css"/>
        </Head>
        <Header user={props.user} />
        <div className="container-fluid">
            {props.children}
        </div>
    </div>
);

BaseLayout.propTypes = {
    children: T.node,
    user: types.User
};

export default BaseLayout;
