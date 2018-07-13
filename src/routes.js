import Home from "./containers/Home";
import Guard from "./containers/Guard";
import Profile from "./containers/Profile";
import AccommodationDetail from "./containers/AccommodationDetail";
import AccommodationsTabs from "./containers/AccommodationsTabs";
import AccommodationCreation from "./containers/AccommodationCreation";
import MissionCreation from "./containers/Mission/MissionCreation";
import MissionEdition from "./containers/Mission/MissionEdition";

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
        path: "/places",
        exact: true,
        component: AccommodationsTabs
    },
    {
        path: "/place/creation",
        exact: true,
        component: AccommodationCreation
    },
    {
        path: "/places/:accoID",
        component: AccommodationDetail
    },
    {
        path: "/mission/creation",
        exact: true,
        component: MissionCreation
    },
    {
        path: "/missions/:missionID",
        exact: true,
        component: MissionEdition
    },
];
