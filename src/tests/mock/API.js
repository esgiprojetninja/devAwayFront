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
    }
};
