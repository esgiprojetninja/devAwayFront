import * as React from "react";
import * as T from "prop-types";
import Navbar from "./Navbar.jsx";

export default class App extends React.PureComponent {
    static propTypes = {
        user: T.shape({
            authenticated: T.bool
        })
    }

    static defaultProps = {
        user: {}
    }

    render() {
        return (
            <div>
                <Navbar />
                <div>{JSON.stringify(this.props.user)}</div>
            </div>
        );
    }
}
