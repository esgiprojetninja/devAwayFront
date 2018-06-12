import * as T from "prop-types";
import { User } from "./userType";

export const accommodationShape = {
    title: T.string,
    id: T.number,
    longitude: T.number,
    latitude: T.number,
    nbBedroom: T.number,
    nbBathroom: T.number,
    nbToilet: T.number,
    nbMaxBaby: T.number,
    nbMaxChild: T.number,
    nbMaxGuest: T.number,
    nbMaxAdult: T.number,
    propertySize: T.number,
    floor: T.number,
    minStay: T.number,
    maxStay: T.number,
    city: T.string,
    region: T.string,
    address: T.string,
    country: T.string,
    type: T.string,
    pictures: T.arrayOf(T.shape({
        id: T.number.isRequired,
        url: T.string.isRequired,
        created_at: T.string.isRequired,
        updated_at: T.string.isRequired,
        accommodation_id: T.number.isRequired,
    })),
    host: User.isRequired,
    animalsAllowed: T.bool,
    smokersAllowed: T.bool,
    hasInternet: T.bool,
    description: T.string,
    createdAt: T.string,
    updatedAt: T.string,
    checkinHour: T.string,
    checkoutHour: T.string,
    mission: T.array
};
export const accommodationPropTypes = T.shape(accommodationShape);
