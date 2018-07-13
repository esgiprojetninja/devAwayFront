export const defaultMissionImage = "/img/people-working-pc.jpg";

export const getMissionImg = (mission) => {
    if (mission.pictures && mission.pictures.length > 0 && mission.pictures[0].url) {
        if (!mission.pictures[0].url.includes("data:image/") && !mission.pictures[0].url.includes("http")) {
            console.log("AAAAAAH", mission.pictures[0]);
            return `data:image/jpeg;base64,${mission.pictures[0].url}`;
        }
        return mission.pictures[0].url;
    }
    return defaultMissionImage;
};
