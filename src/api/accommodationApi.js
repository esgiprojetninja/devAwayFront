import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

import {
    generateFetch,
    generateAnonymousFetch
} from "./utils/utils";

function create(accommodation) {
    return generateFetch("accommodations", "POST", null, accommodation);
}

function update(accommodation) {
    return generateFetch("accommodations", "PUT", accommodation.id, accommodation);
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
        return generateAnonymousFetch("accommodations", "GET").then((parsed) => {
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
    createOrUpdate: (accommodation) => {
        return accommodation.id > 0 ? update(accommodation) : create(accommodation);
    },
    deleteItem: (id) => {
        return generateFetch("accommodations", "DELETE", id);
    },
    fetchById: (id) => {
        return generateFetch(`accommodations/${id}`, "GET");
    }
};

export default accommodationApi;
