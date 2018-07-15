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
    addCandidacy: (missionId, data) => {
        return generateFetch(`missions/${missionId}/apply`, "POST", null, data);
    },
    cancelCandidacy: (missionId) => {
        return generateFetch(`missions/${missionId}/leave`, "POST", null);
    },
    upsertPicture: (picture) => {
        return picture.id === null || Number.isNaN(Number(picture.id)) ?
            generateFetch(`missions/${picture.mission_id}/pictures`, "PUT", null, picture)
            : generateFetch("pictures/missions", "PUT", picture.id, picture);
    },
};

export default missionApi;
