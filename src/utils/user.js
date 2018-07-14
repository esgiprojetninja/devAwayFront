export default (imgUrl) => {
    if (imgUrl) {
        if (!imgUrl.includes("data:image/") && !imgUrl.includes("http")) {
            return `data:image/jpeg;base64,${imgUrl}`;
        }
        return imgUrl;
    }
    return null;
};
