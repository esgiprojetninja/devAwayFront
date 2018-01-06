import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

import {
    generateFetch
} from "./utils/utils";

function create(mission) {
    return generateFetch("missions", "POST", null, mission);
}

function update(mission) {
    return generateFetch("missions", "PUT", mission.id, mission);
}

const missionApi = {
    fetchAll: () => {
        return generateFetch("missions", "GET").then((parsed) => {
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
    createOrUpdate: (mission) => {
        return mission.id > 0 ? update(mission) : create(mission);
    },
    deleteItem: (id) => {
        return generateFetch("missions", "DELETE", id);
    }
};

export default missionApi;
