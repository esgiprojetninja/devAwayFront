import * as T from "prop-types";

export const User = T.shape({
    id: T.number.isRequired,
    email: T.string.isRequired,
    lastName: T.string,
    firstName: T.string,
    languages: T.string,
    skills: T.string,
    createdAt: T.string,
    updatedAt: T.string,
    avatar: T.string,
    roles: T.number,
    isActive: T.number,
    userName: T.string.isRequired
});

export const toto = "toto";
