import Home from "./containers/Home";
import Guard from "./containers/Guard";
import Profile from "./containers/Profile";
import AccommodationsList from "./containers/AccommodationsList";
import AccommodationDetail from "./containers/AccommodationDetail";

export default [
    {
        path: "/",
        exact: true,
        component: Home
    },
    {
        path: "/guard",
        exact: true,
        component: Guard
    },
    {
        path: "/profile",
        exact: true,
        component: Profile
    },
    {
        path: "/accommodations",
        exact: true,
        component: AccommodationsList
    },
    {
        path: "/accommodations/:accoID",
        component: AccommodationDetail
    }
];
