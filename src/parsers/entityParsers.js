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

export const engrengregnr = "fejgerfezrg";
