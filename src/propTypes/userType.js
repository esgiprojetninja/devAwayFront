import * as T from "prop-types";

export const User = T.shape({
    id: T.number.isRequired,
    email: T.string.isRequired,
    lastName: T.string.isRequired,
    firstName: T.string.isRequired,
    languages: T.string.isRequired,
    skills: T.string.isRequired,
    createdAt: T.string.isRequired,
    updateAt: T.string.isRequired,
    username: T.string.isRequired
});

export const CreationUser = T.shape({
    email: T.string.isRequired,
    password: T.string.isRequired,
    password_check: T.string.isRequired,
    username: T.string.isRequired
});

export const toto = "toto";
