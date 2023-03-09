import * as types from "./actionTypes";

const prevState = {
    pendingOrder: [],
    completeOrder: [],
    isLoading: false,
    isError: false,
};

const reducer = (state = prevState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.GET_PENDING_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_PENDING_SUCCESS:
            return {
                ...state,
                pendingOrder: payload,
                isLoading: false,
            };
        case types.GET_PENDING_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        case types.GET_COMPLETE_ORDER_REQUEST:
            return {
                ...state,
            };
        case types.GET_COMPLETE_ORDER_SUCCESS:
            return {
                ...state,
                completeOrder: payload,
            };
        case types.GET_COMPLETE_ORDER_FAILURE:
            return {
                ...state,
            };
        default:
            return state;
    };
};

export { reducer };