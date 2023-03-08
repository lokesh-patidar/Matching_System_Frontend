import * as types from "./actionTypes";

const prevState = {
    buyers: [],
    sellers: [],
    isLoading: false,
    isError: false,
};

const reducer = (state = prevState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.GET_BUYERS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_BUYERS_SUCCESS:
            return {
                ...state,
                buyers: payload,
                isLoading: false,
            };
        case types.GET_BUYERS_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        case types.GET_SELLERS_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case types.GET_SELLERS_SUCCESS:
            return {
                ...state,
                sellers: payload,
                isLoading: false,
            };
        case types.GET_SELLERS_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false,
            };
        default:
            return state;
    };
};

export { reducer };