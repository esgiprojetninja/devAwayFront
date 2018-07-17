import { basicUser } from "./body/user";
import { accommodationMock } from "../mock/body/accommodation";

export const mockAPI = {
    accommodationApi: {
        fetchAll: () => Promise.resolve([]),
        fetchAllWithoutAuth: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({
            id: 5,
            title: "los singos"
        }),
        deleteItem: () => Promise.resolve({
            deleted: true
        }),
        fetchById: () => Promise.resolve({
            poulay: "man",
            host: "POULAAAY",
        }),
        upsertPicture: () => Promise.resolve({
            ok: true,
            poulay: "man",
            host: "POULAAAY",
        }),
    },
    userApi: {
        login: () => Promise.resolve({ success: { token: "prout" } }),
        upsertUser: () => Promise.resolve(basicUser),
        getAccommodations: () => Promise.resolve(
            Array.from(new Array(1)).map((a, i) => ({
                ...accommodationMock,
                id: i
            }))
        )
    },
    missionApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({ id: 123, title: "poulay mission" }),
        deleteItem: () => Promise.resolve({}),
        applyToMission: () => Promise.resolve({ poulay: "man" }),
        fetchById: id => Promise.resolve({ id: id || 123, poulay: "man" }),
        addCandidacy: id => Promise.resolve({ id: id || 123, poulay: "man" }),
        cancelCandidacy: id => Promise.resolve({ id: id || 123, poulay: "man" }),
        upsertPicture: () => Promise.resolve({
            ok: true,
            poulay: "man",
            id: 1234,
        }),
    },
    messageApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({}),
        deleteItem: () => Promise.resolve({}),
        fetchOwnerMessages: () => Promise.resolve(["POULAY"]),
        fetchTravllererMessages: () => Promise.resolve(["POULAY"]),
        fetchDiscussionMessages: () => Promise.resolve(["POULAY"]),
        sendMessage: () => Promise.resolve(["POULAY"]),
    },
    profileApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({}),
        deleteItem: () => Promise.resolve({}),
        getMe: () => Promise.resolve({
            some: "user",
            id: 1,
            email: "coucou",
            userName: "azy"
        })
    },
    guardApi: {
        checkGuard: () => Promise.resolve({ token: "prout" }),
        createGuard: () => Promise.resolve({ code: 123456 })
    }
};

export const mockAPIWithErrors = {
    accommodationApi: {
        fetchAll: () => Promise.resolve({
            hasError: true,
            message: "Not gonna happen bruh"
        }),
        createOrUpdate: () => Promise.resolve({
            hasError: true,
            message: "Hey hey, my my"
        }),
        deleteItem: () => Promise.resolve({
            hasError: true,
            message: "Couldn't delete"
        }),
        fetchById: () => Promise.resolve({
            hasError: true,
            message: "Fongalakwaki"
        }),
        upsertPicture: () => Promise.resolve({
            hasError: true,
            message: "such uglyness"
        }),
    },
    missionApi: {
        fetchAll: () => Promise.resolve({
            hasError: true,
            message: "Ooops"
        }),
        createOrUpdate: () => Promise.resolve({
            hasError: true,
            message: "Won't save"
        }),
        deleteItem: () => Promise.resolve({
            hasError: true,
            message: "Couldn't delete"
        }),
        fetchById: () => Promise.resolve({
            hasError: true,
            message: "Couldn't get mission"
        }),
        upsertPicture: () => Promise.resolve({
            hasError: true,
            message: "such uglyness"
        }),
        addCandidacy: () => Promise.resolve({
            hasError: true,
            message: "such uglyness"
        }),
        cancelCandidacy: () => Promise.resolve({
            hasError: true,
            message: "such uglyness"
        }),
    },
    messageApi: {
        fetchAll: () => Promise.resolve({
            hasError: true,
            message: "Ooops"
        }),
        createOrUpdate: () => Promise.resolve({
            hasError: true,
            message: "Won't save"
        }),
        deleteItem: () => Promise.resolve({
            hasError: true,
            message: "Couldn't delete"
        }),
        fetchOwnerMessages: () => Promise.resolve({
            hasError: true,
            message: "Ooops"
        }),
        fetchTravllererMessages: () => Promise.resolve({
            hasError: true,
            message: "Ooops"
        }),
        fetchDiscussionMessages: () => Promise.resolve({
            hasError: true,
            message: "Ooops"
        }),
        sendMessage: () => Promise.resolve({
            hasError: true,
            message: "Ooops"
        }),
    },
    profileApi: {
        fetchAll: () => Promise.resolve({
            hasError: true,
            message: "Ooops"
        }),
        createOrUpdate: () => Promise.resolve({
            hasError: true,
            message: "Won't save"
        }),
        deleteItem: () => Promise.resolve({
            hasError: true,
            message: "Couldn't delete"
        }),
        getMe: () => Promise.resolve({
            hasError: true,
            message: "Who are you ?"
        })
    },
    guardApi: {
        checkGuard: () => Promise.resolve({
            hasError: true,
            message: "Auth error"
        }),
        createGuard: () => Promise.resolve({
            hasError: true,
            message: "Yoops"
        })
    },
    userApi: {
        login: () => Promise.resolve({
            hasError: true,
            message: "No sir, you are not comin in"
        }),
        upsertUser: () => Promise.resolve({
            hasError: true,
            message: "POULAY ERROR"
        }),
        getAccommodations: () => Promise.resolve({
            hasError: true
        })
    }
};

export const mockAPIWithServerFailure = {
    accommodationApi: {
        fetchAll: () => Promise.reject(new Error({
            code: 500,
            message: "gtfo"
        })),
        createOrUpdate: () => Promise.reject(new Error("gtfo")),
        deleteItem: () => Promise.reject(new Error("gtfo")),
        fetchById: () => Promise.reject(new Error("gtfo")),
        upsertPicture: () => Promise.reject(new Error("gtfo")),
    },
    missionApi: {
        fetchAll: () => Promise.reject(new Error("gtfo")),
        createOrUpdate: () => Promise.reject(new Error("gtfo")),
        deleteItem: () => Promise.reject(new Error("gtfo")),
        fetchById: () => Promise.reject(new Error("gtfo")),
        upsertPicture: () => Promise.reject(new Error("gtfo")),
        addCandidacy: () => Promise.reject(new Error("gtfo")),
        cancelCandidacy: () => Promise.reject(new Error("gtfo")),
    },
    messageApi: {
        fetchAll: () => Promise.reject(new Error("gtfo")),
        createOrUpdate: () => Promise.reject(new Error("gtfo")),
        deleteItem: () => Promise.reject(new Error("gtfo")),
        fetchOwnerMessages: () => Promise.reject(new Error("gtfo")),
        fetchTravllererMessages: () => Promise.reject(new Error("gtfo")),
        fetchDiscussionMessages: () => Promise.reject(new Error("gtfo")),
        sendMessage: () => Promise.reject(new Error("gtfo")),
    },
    profileApi: {
        fetchAll: () => Promise.reject(new Error("gtfo")),
        createOrUpdate: () => Promise.reject(new Error("gtfo")),
        deleteItem: () => Promise.reject(new Error("gtfo")),
        getMe: () => Promise.reject(new Error("gtfo"))
    },
    guardApi: {
        checkGuard: () => Promise.reject(new Error("gtfo")),
        createGuard: () => Promise.reject(new Error("gtfo"))
    },
    userApi: {
        login: () => Promise.reject(new Error({
            code: 500,
            message: "gtfo"
        })),
        upsertUser: () => Promise.reject(new Error("gtfo")),
        getAccommodations: () => Promise.reject(new Error("gtfo", {
            code: 500,
            message: "gtfo",
        })),
    }
};
