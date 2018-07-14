import moment from "moment";

export const defaultMissionImage = "/img/people-working-pc.jpg";

export const getMissionImg = (mission) => {
    if (mission.pictures && mission.pictures.length > 0 && mission.pictures[0].url) {
        if (!mission.pictures[0].url.includes("data:image/") && !mission.pictures[0].url.includes("http")) {
            return `data:image/jpeg;base64,${mission.pictures[0].url}`;
        }
        return mission.pictures[0].url;
    }
    return defaultMissionImage;
};

export const DATE_FORMAT = "YYYY-MM-DD";
export const HOUR_FORMAT = "HH:mm";

export const getRules = (accommodationsObj) => {
    const accoArr = Object.keys(accommodationsObj)
        .filter(id => id !== null && id !== undefined && !Number.isNaN(Number(id)))
        .map(id => ({
            label: accommodationsObj[id].title,
            id: Number(id)
        }));
    const m = global.jestmoment || moment;

    return {
        accoArr,
        rules: {
            title: { min: 6, max: 24 },
            description: { min: 6, max: 255 },
            checkinDate: { min: m().local().add(1, "hours"), isDate: true },
            checkoutDate: { min: m().local().add(1, "day"), isDate: true },
            stayTime: { min: 1, max: (1000 * 60 * 60 * 24 * 365 * 10) }, // max 10 years
            stayTimeUnit: {
                values: [
                    { label: "hours", value: 0 },
                    { label: "days", value: 1 },
                    { label: "weeks", value: 2 },
                    { label: "months", value: 3 },
                ],
                isSelect: true
            },
            accommodation_id: {
                values: accoArr.map(acco => ({
                    ...acco,
                    value: acco.id
                })),
                isSelect: true,
            },
        }
    };
};

export const getStateFromRules = formRules => ({
    title: "",
    titleError: "",
    description: "",
    descriptionError: "",
    checkinDate: formRules.checkinDate.min.format(DATE_FORMAT),
    checkinDateHour: formRules.checkinDate.min.format(HOUR_FORMAT),
    checkinDateError: "",
    checkoutDate: formRules.checkoutDate.min.format(DATE_FORMAT),
    checkoutDateHour: formRules.checkoutDate.min.format(HOUR_FORMAT),
    checkoutDateError: "",
    stayTime: formRules.stayTime.min,
    stayTimeError: "",
    stayTimeUnit: formRules.stayTimeUnit.values[2].value,
    stayTimeUnitError: "",
    accommodation_id: "",
    accommodation_idError: "",
});
