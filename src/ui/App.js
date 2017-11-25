import React from "react";
import { PropTypes as T } from "prop-types";

class App extends React.PureComponent {
    render() {
        return this.props.user.authenticated ?
            (
                <div>{JSON.stringify(this.props.user)}</div>
            ) :
            (<div>Hey jude</div>);
    }
}
App.propTypes = {
    user: T.shape({
        authenticated: T.bool.isRequired,
    }).isRequired,
};


export default App;
