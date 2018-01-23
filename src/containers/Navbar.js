import { connect } from "react-redux";

import NavbarComponent from "../ui/Navbar";

const mapStateToProps = state => state;

const mapDispatchToProps = () => ({
});

const Navbar = connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavbarComponent);

export default Navbar;
