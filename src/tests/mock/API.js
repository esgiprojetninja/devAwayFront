import { basicUser } from "./body/user";

export const mockAPI = {
    accommodationApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({
            id: 5,
            title: "los singos"
        }),
        deleteItem: () => Promise.resolve({
            deleted: true
        })
    },
    userApi: {
        login: (credentials) => {
            if (credentials) {
                return credentials.username && credentials.password ?
                    Promise.resolve({ token: "prout" })
                    : Promise.resolve({ code: 403, message: "Bad credentials" });
            }
            return Promise.reject(new Error("gtfo"));
        },
        addUser(user) {
            if (user) {
                return user.username && user.password ? Promise.resolve(basicUser) : Promise.resolve("gtfo");
            }
            return Promise.reject(new Error("gtfo"));
        }
    },
    missionApi: {
        fetchAll: () => Promise.resolve([]),
        createOrUpdate: () => Promise.resolve({}),
        deleteItem: () => Promise.resolve({})
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
        getMe: (token) => {
            if (token === "error") {
                return Promise.reject(new Error("gtfo"));
            } else if (token === "fail") {
                return Promise.resolve({
                    code: 403,
                    message: "Fucked up token"
                });
            }
            return Promise.resolve({
                some: "user",
                id: 1,
                email: "coucou",
                username: "azy"
            });
        }
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
            message: "Naupe !"
        }),
        createOrUpdate: () => Promise.resolve({
            hasError: true,
            message: "Naupe !"
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
            hasError: true
        }),
        addUser: () => Promise.resolve({
            hasError: true
        })
    }
};
