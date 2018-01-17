export function parseCollectionFromApi(items) {
    console.log('items', items);
    const data = [];
    const byID = new Map();
    if(items) {
        Array.from(items).forEach((item) => {
            data.push(item.id);
            byID.set(item.id, item);
        });
        data.sort((a, b) => a - b);
        console.log('test', {data, byID});
        return {
            data,
            byID
        };
    }
    return;
}
