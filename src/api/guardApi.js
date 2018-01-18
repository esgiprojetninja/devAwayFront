import {
    generateAnonymousFetch
} from "./utils/utils";

const guardApi = {
    checkGuard: (credentials) => {
        return generateAnonymousFetch("guard_code", "POST", credentials);
    }
};

export default guardApi;
