import { SERVER_CALL_REQUEST, SERVER_CALL_SUCCESS, SERVER_CALL_FALIURE } from "../action";

const initialState = {
    response: {},
    error: "",
    isFetching: false
};

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case SERVER_CALL_REQUEST:
        case SERVER_CALL_SUCCESS:
        case SERVER_CALL_FALIURE:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
};

export { listReducer };
