import Header from "./Header";
import React from "react";
import T from "prop-types";

const layoutStyle = {
    margin: "1em",
    padding: "1em",
    border: "1px solid #DDD"
};

const BaseLayout = (props) => (
    <div style={layoutStyle}>
        <Header />
        {props.children}
    </div>
);

BaseLayout.propTypes = {
    children: T.node
};

export default BaseLayout;
