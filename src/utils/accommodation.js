export const defaultAccommodationImage = "/img/accommodation.jpg";

export const getAccoImg = (acco) => {
    return acco.pictures && acco.pictures.length > 0 ?
        acco.pictures[0].url :
        defaultAccommodationImage;
};
