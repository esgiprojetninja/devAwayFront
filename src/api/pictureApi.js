import {
    parseCollectionFromApi
} from "../parsers/entityParsers";

import {
    generateFetchWithoutAuth
} from "./utils/utils";

function getPicture() {
    return generateFetchWithoutAuth("pictures", null);
}

const pictureApi = {
    fetchPicture: (id) => {
        return generateFetchWithoutAuth("pictures", "GET", id).then((parsed) => {
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
    }
};

export default pictureApi;
