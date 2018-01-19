import {
    generateFetch
} from "./utils/utils";

const guardApi = {
    createGuard: () => {
        return generateFetch("guard_code/create", "POST", undefined, {}, "json");
    }
};

export default guardApi;
