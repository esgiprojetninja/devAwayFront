import { accommodationMock } from "./accommodation";

export const missionMock = {
    id: 156789,
    title: "coucou title",
    description: "coucou description",
    checkinDate: "coucou checkinDate",
    checkoutDate: "coucou checkoutDate",
    candidates: [],
    pictures: [],
    travellers: [],
    accommodation: accommodationMock
};

export const genMissionsMock = (length = 4) => Array.from({ length })
    .map((undef, i) => ({
        ...missionMock,
        id: i + 1
    }));

export const tutu = "tutu";
