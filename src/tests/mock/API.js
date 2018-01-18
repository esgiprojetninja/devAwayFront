export const mockAPI = {
    userApi: {
        login: () => Promise.resolve({ token: "prout" })
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
        getMe: () => Promise.resolve({ some: "user" })
    },
    guardApi: {
        checkGuard: () => Promise.resolve(123456)
    }
};


export const mockAPIWithErrors = {
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
        })
    }
};
