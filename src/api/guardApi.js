import {
    generateAnonymFetch
} from "./utils/utils";

const guardApi = {
    checkGuard: (credentials) => {
        return generateAnonymFetch("check_guard", "POST", credentials);
    }
};

export default guardApi;
