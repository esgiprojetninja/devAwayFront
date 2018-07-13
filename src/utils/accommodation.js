export const defaultAccommodationImage = "/img/accommodation.jpg";

export const getAccoImg = (acco) => {
    if (acco.pictures && acco.pictures.length > 0 && acco.pictures[0].url) {
        if (acco.pictures[0].url.includes("data:image/") && !acco.pictures[0].url.includes("http")) {
            return `data:image/jpeg;base64,${acco.pictures[0].url}`;
        }
        return acco.pictures[0].url;
    }
    return defaultAccommodationImage;
};
