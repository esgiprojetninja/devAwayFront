import { connect } from "react-redux";

import NavbarComponent from "../ui/Navbar";

export const mapStateToProps = state => state;

export const mapDispatchToProps = () => ({
    gtfo() {}
});

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarComponent);

export default Navbar;
