import { isFunction } from "util";

const TOP_LEFT = "POULAY_TOP_LEFT";

let newSizeSpy = null;
let newPointSpy = null;
let newMarkerSpy = null;
export const getNewSizeSpy = (jest) => {
    if (newSizeSpy === null && jest) {
        newSizeSpy = jest.fn();
    }
    return newSizeSpy;
};
export const getNewPointSpy = (jest) => {
    if (newPointSpy === null && jest) {
        newPointSpy = jest.fn();
    }
    return newPointSpy;
};
export const getNewMarkerSpy = (jest) => {
    if (newMarkerSpy === null && jest) {
        newMarkerSpy = jest.fn();
    }
    return newMarkerSpy;
};

export default (jest) => {
    newSizeSpy = jest.fn();
    newPointSpy = jest.fn();
    newMarkerSpy = jest.fn();
    return {
        maps: {
            Map: class {
                controls = {
                    POULAY_TOP_LEFT: [],
                };
                addListener = jest.fn((...args) => {
                    args.forEach((arg) => {
                        if (isFunction(arg)) {
                            arg();
                        }
                    });
                })
                fitBounds = jest.fn()
                getBounds = jest.fn()
                panTo = jest.fn()
            },
            ControlPosition: {
                TOP_LEFT,
            },
            places: {
                SearchBox: class {
                    setBounds = jest.fn()
                    addListener = jest.fn()
                    getPlaces = jest.fn()
                },
            },
            event: {
                clearInstanceListeners() {},
            },
            LatLngBounds: class {
                union = jest.fn()
                extend = jest.fn()
            },
            LatLng: class {
                union = jest.fn()
                extend = jest.fn()
            },
            Marker: class {
                constructor() {
                    getNewMarkerSpy(jest)();
                }
                setMap = jest.fn()
            },
            Size: class {
                constructor() {
                    getNewSizeSpy(jest)();
                }
            },
            Point: class {
                constructor() {
                    getNewPointSpy(jest)();
                }
            },
        }
    };
};
