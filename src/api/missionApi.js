import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

import {
    generateFetch,
    defaultErrorHandler,
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
    fetchById: (id) => {
        return generateFetch(`missions/${id}`, "GET");
    },
    // TODO: check update and create methods when api is ok
    createOrUpdate: (mission) => {
        return mission.id > 0 ?
            update(mission)
            : create(mission)
                .then(res => Promise.resolve(res.success))
                .catch(defaultErrorHandler);
    },
    deleteItem: (id) => {
        return generateFetch("missions", "DELETE", id);
    },
    applyToMission: (userId, missionId) => { // eslint-disable-line
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
};

export default missionApi;
