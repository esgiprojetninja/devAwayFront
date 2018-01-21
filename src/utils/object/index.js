const objectsHaveSameKeys = (obj1, obj2) => {
    const keys2 = Object.keys(obj2).sort().join("");
    const keys1 = Object.keys(obj1).sort().join("");
    return keys1 === keys2;
};

export default objectsHaveSameKeys;

