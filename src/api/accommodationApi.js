import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

import {
    generateFetch,
    generateFetchWithoutAuth
} from "./utils/utils";

function create(accommodation) {
    return generateFetch("accommodations", "POST", null, accommodation);
}

function update(accommodation) {
    return generateFetch("accommodations", "PUT", accommodation.id, accommodation);
}

function getAccommodations() {
    return generateFetchWithoutAuth("accommodations", null);
}

const accommodationApi = {
    fetchAll: () => {
        return generateFetch("accommodations", "GET").then((parsed) => {
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
    fetchAllWithoutAuth: () => {
        return generateFetchWithoutAuth("accommodations", "GET").then((parsed) => {
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
    createOrUpdate: (accommodation) => {
        return accommodation.id > 0 ? update(accommodation) : create(accommodation);
    },
    deleteItem: (id) => {
        return generateFetch("accommodations", "DELETE", id);
    }
};

export default accommodationApi;
