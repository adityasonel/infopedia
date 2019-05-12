import { SERVER_CALL_REQUEST, SERVER_CALL_SUCCESS, SERVER_CALL_FALIURE } from "./Type";
import { fetchList } from "../repo/";

let fetchListAction = url => {
    return async dispatch => {
        dispatch(onServerCallRequest());
        fetchList(url)
            .then(result => dispatch(onServerCallSuccess(result)), error => dispatch(onServerCallFailed(error.message)))
            .catch(error => dispatch(onServerCallFailed(error.message)));
    };
};

const onServerCallRequest = () => {
    return {
        type: SERVER_CALL_REQUEST,
        payload: { response: {}, error: "", isFetching: true }
    };
};

const onServerCallSuccess = response => {
    return {
        type: SERVER_CALL_SUCCESS,
        payload: { response: response, error: "", isFetching: false }
    };
};

const onServerCallFailed = errorMsg => {
    return {
        type: SERVER_CALL_FALIURE,
        payload: { response: {}, error: errorMsg, isFetching: false }
    };
};

export { fetchListAction };
