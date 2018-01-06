import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

import {
    generateFetch
} from "./utils/utils";

function create(profile) {
    return generateFetch("profiles", "POST", null, profile);
}

function update(profile) {
    return generateFetch("profiles", "PUT", profile.id, profile);
}

const profileApi = {
    fetchAll: () => {
        return generateFetch("profiles", "GET").then((parsed) => {
            if (parsed.hasError) {
                return parsed;
            }
            const {
                byID,
                data
            } = parseCollectionFromApi(parsed);
            return {
                byID,
                data
            };
        });
    },
    // TODO: check update and create methods when api is ok
    createOrUpdate: (profile) => {
        return profile.id > 0 ? update(profile) : create(profile);
    },
    deleteItem: (id) => {
        return generateFetch("profiles", "DELETE", id);
    }
};

export default profileApi;
