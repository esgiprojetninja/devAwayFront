import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

import {
    generateFetch
} from "./utils/utils";

function create(message) {
    return generateFetch("messages", "POST", null, message);
}

function update(message) {
    return generateFetch("messages", "PUT", message.id, message);
}

const messageApi = {
    fetchAll: () => {
        return generateFetch("messages", "GET").then((parsed) => {
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
    createOrUpdate: (message) => {
        return message.id > 0 ? update(message) : create(message);
    },
    deleteItem: (id) => {
        return generateFetch("messages", "DELETE", id);
    }
};

export default messageApi;
