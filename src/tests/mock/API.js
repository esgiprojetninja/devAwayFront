import { basicUser } from "./body/user";

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
            poulay: "man"
        })
    },
    userApi: {
        login: () => Promise.resolve({ success: { token: "prout" } }),
        addUser: () => Promise.resolve(basicUser)
    },
    missionApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({}),
        deleteItem: () => Promise.resolve({}),
        applyToMission: () => Promise.resolve({ poulay: "man" })
    },
    messageApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({}),
        deleteItem: () => Promise.resolve({})
    },
    profileApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({}),
        deleteItem: () => Promise.resolve({}),
        getMe: () => Promise.resolve({
            some: "user",
            id: 1,
            email: "coucou",
            username: "azy"
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
        })
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
        })
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
        })
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
        addUser: () => Promise.resolve({
            hasError: true
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
        deleteItem: () => Promise.reject(new Error("gtfo"))
    },
    missionApi: {
        fetchAll: () => Promise.reject(new Error("gtfo")),
        createOrUpdate: () => Promise.reject(new Error("gtfo")),
        deleteItem: () => Promise.reject(new Error("gtfo"))
    },
    messageApi: {
        fetchAll: () => Promise.reject(new Error("gtfo")),
        createOrUpdate: () => Promise.reject(new Error("gtfo")),
        deleteItem: () => Promise.reject(new Error("gtfo"))
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
        addUser: () => Promise.reject(new Error({
            code: 500,
            message: "gtfo"
        })),
        getAccommodations: () => Promise.reject(new Error("gtfo", {
            code: 500,
            message: "gtfo",
        })),
    }
};
