import * as T from "prop-types";

export const User = T.shape({
    id: T.number.isRequired,
    email: T.string.isRequired,
    lastName: T.string.isRequired,
    firstName: T.string.isRequired,
    languages: T.string.isRequired,
    skills: T.string.isRequired,
    createdAt: T.string,
    updatedAt: T.string,
    avatar: T.string,
    roles: T.number,
    isActive: T.number,
    username: T.string.isRequired
});

export const toto = "toto";
