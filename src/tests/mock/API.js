const mockAPI = {
    userApi: {
        login: () => Promise.resolve({ token: "prout" })
    }
};

export default mockAPI;
