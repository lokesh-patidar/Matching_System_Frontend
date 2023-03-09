import axios from "axios";
import * as types from "./actionTypes";

const getPending = () => (dispatch) => {
    dispatch({ type: types.GET_PENDING_REQUEST });
    return axios.get(`https://faithful-clam-veil.cyclic.app/pending/`)
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
    return axios.delete(`https://faithful-clam-veil.cyclic.app/pending/delete/${id}`)
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
    return axios.post(`https://faithful-clam-veil.cyclic.app/pending/add`, payload)
        .then((res) => {
            dispatch({ type: types.ADD_PENDING_SUCCESS, payload: res.data });
            console.log("Pending Added", res.data);
            console.log("payload:", payload);
        })
        .catch((err) => {
            dispatch({ type: types.ADD_PENDING_FAILURE });
        });
};

const updatePending = (id, payload) => (dispatch) => {
    dispatch({ type: types.UPDATE_PENDING_REQUEST });
    return axios.patch(`https://faithful-clam-veil.cyclic.app/pending/update/${id}`, payload)
        .then((res) => {
            dispatch({ type: types.UPDATE_PENDING_SUCCESS, payload: res.data });
            console.log("Pending Added", res.data);
            console.log("payload:", payload);
        })
        .catch((err) => {
            dispatch({ type: types.UPDATE_PENDING_FAILURE });
        });
};


const getCompleteOrder = () => (dispatch) => {
    dispatch({ type: types.GET_COMPLETE_ORDER_REQUEST });
    return axios.get(`https://faithful-clam-veil.cyclic.app/complete`)
        .then((res) => {
            dispatch({ type: types.GET_COMPLETE_ORDER_SUCCESS, payload: res.data });
            console.log("completeOrderData:-", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.GET_COMPLETE_ORDER_FAILURE });
        });
};

const addCompleteOrder = (payload) => (dispatch) => {
    dispatch({ type: types.ADD_COMPLETE_ORDER_REQUEST });
    return axios.post(`https://faithful-clam-veil.cyclic.app/complete/add`, payload)
        .then((res) => {
            dispatch({ type: types.ADD_COMPLETE_ORDER_SUCCESS, payload: res.data });
            console.log("complete:-", res.data);
            console.log("payload:", payload);
        })
        .catch((err) => {
            dispatch({ type: types.ADD_COMPLETE_ORDER_FAILURE });
        });
};


export { getPending, addPending, deletePending, getCompleteOrder, addCompleteOrder,updatePending };