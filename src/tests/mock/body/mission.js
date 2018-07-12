export const missionMock = {
    id: 156789,
    title: "coucou title",
    description: "coucou description",
    checkinDate: "coucou checkinDate",
    checkoutDate: "coucou checkoutDate",
    candidates: [],
    traveler: null,
};

export const genMissionsMock = (length = 4) => Array.from({ length })
    .map((undef, i) => ({
        ...missionMock,
        id: i
    }));

export const tutu = "tutu";
