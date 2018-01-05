export function createActionCreator(type) {
    return (payload) => {
        // only define "payload" key if given
        return arguments.length ? { type, payload } : { type };
    };
}

export function createErrorCreator(type) {
    return (payload) => {
        return arguments.length ? { type, payload, error: true } : { type, error: true };
    };
}

// util to generate constants & main action creator for API calls
export function makeBasicAPIActions(baseName, factory) {
    const REQUEST = `${baseName}_REQUEST`;
    const SUCCESS = `${baseName}_SUCCESS`;
    const FAILURE = `${baseName}_FAILURE`;
    const request = createActionCreator(REQUEST);
    const success = createActionCreator(SUCCESS);
    const failure = createErrorCreator(FAILURE);
    return [
        REQUEST, SUCCESS, FAILURE,
        factory(request, success, failure)
    ];
}
