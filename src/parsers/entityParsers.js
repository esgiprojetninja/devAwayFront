export const remapAccoProps = (item) => {
    const acco = item;
    if (Object.prototype.hasOwnProperty.call(item, "animalsAllowed")) {
        acco.animalsAllowed = !!acco.animalsAllowed;
    }
    if (Object.prototype.hasOwnProperty.call(item, "smokersAllowed")) {
        acco.smokersAllowed = !!acco.smokersAllowed;
    }
    if (Object.prototype.hasOwnProperty.call(item, "hasInternet")) {
        acco.hasInternet = !!acco.hasInternet;
    }
    if (Object.prototype.hasOwnProperty.call(item, "pictures")) {
        acco.pictures = acco.pictures.map(pic => ({
            ...pic,
            url: `data:image/jpeg;base64,${pic.url}`,
        }));
    }
    return acco;
};

export const remapAccoPropsInMap = (accoMap) => {
    const iterator = accoMap.keys();
    let next = iterator.next();
    while (next && next.value) {
        accoMap.set(
            next.value,
            remapAccoProps(accoMap.get(next.value))
        );
        next = iterator.next();
    }
    return accoMap;
};

export function parseCollectionFromApi(items) {
    const data = [];
    const byID = new Map();
    Array.from(items).forEach((item) => {
        data.push(item.id);
        byID.set(item.id, item);
    });
    data.sort((a, b) => a - b);
    return {
        data,
        byID
    };
}
