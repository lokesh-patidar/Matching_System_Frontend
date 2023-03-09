import axios from "axios";
import * as types from "./actionTypes";

const getPending = () => (dispatch) => {
    dispatch({ type: types.GET_PENDING_REQUEST });
    return axios.get(`localhost:6190/pending/`)
        .then((res) => {
            dispatch({ type: types.GET_PENDING_SUCCESS, payload: res.data });
            console.log("Pending", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.GET_PENDING_FAILURE });
        });

};

const deletePending = (id) => (dispatch) => {
    dispatch({ type: types.DELETE_PENDING_REQUEST });
    return axios.delete(`localhost:6190/pending/delete/${id}`)
        .then((res) => {
            dispatch({ type: types.DELETE_PENDING_SUCCESS, payload: res.data });
            console.log("deleted pending", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.DELETE_PENDING_FAILURE });
        });

};

const addPending = (payload) => (dispatch) => {
    dispatch({ type: types.ADD_PENDING_REQUEST });
    return axios.post(`localhost:6190/pending/add`, payload)
        .then((res) => {
            dispatch({ type: types.ADD_PENDING_SUCCESS, payload: res.data });
            console.log("Pending Added", payload);
        })
        .catch((err) => {
            dispatch({ type: types.ADD_PENDING_FAILURE });
        });

};


const getCompleteOrder = () => (dispatch) => {
    dispatch({ type: types.GET_COMPLETE_ORDER_REQUEST });
    return axios.get(`localhost:6190/complete`)
        .then((res) => {
            dispatch({ type: types.GET_COMPLETE_ORDER_SUCCESS, payload: res.data });
            console.log("complete:-", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.GET_COMPLETE_ORDER_FAILURE });
        });
};

const addCompleteOrder = () => (dispatch) => {
    dispatch({ type: types.ADD_COMPLETE_ORDER_REQUEST });
    return axios.post(`localhost:6190/complete/add`)
        .then((res) => {
            dispatch({ type: types.ADD_COMPLETE_ORDER_SUCCESS, payload: res.data });
            console.log("complete:-", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.ADD_COMPLETE_ORDER_FAILURE });
        });
};


export { getPending, addPending, deletePending, getCompleteOrder, addCompleteOrder };