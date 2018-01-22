import { basicUser } from "./body/user";

export const mockAPI = {
    accommodationApi: {
        fetchAll: () => Promise.resolve([])
    },
    userApi: {
        login: () => Promise.resolve({ token: "prout" }),
        addUser: () => Promise.resolve(basicUser)
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
            message: "Naupe !"
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
