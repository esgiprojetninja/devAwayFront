import Home from "./containers/Home";
import Guard from "./containers/Guard";
import Profile from "./containers/Profile";
import AccommodationDetail from "./containers/AccommodationDetail";
import AccommodationsTabs from "./containers/AccommodationsTabs";
import AccommodationCreation from "./containers/AccommodationCreation";

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
        component: AccommodationsTabs
    },
    {
        path: "/accommodations/create",
        exact: true,
        component: AccommodationCreation
    },
    {
        path: "/accommodations/:accoID",
        component: AccommodationDetail
    }
];
