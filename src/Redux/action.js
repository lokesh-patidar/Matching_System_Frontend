import axios from "axios";
import * as types from "./actionTypes";

const getBuyer = () => (dispatch) => {
    dispatch({ type: types.GET_BUYERS_REQUEST });
    return axios.get(`https://brown-dress.cyclic.app/buyer`)
        .then((res) => {
            dispatch({ type: types.GET_BUYERS_SUCCESS, payload: res.data });
            console.log("buyer", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.GET_BUYERS_FAILURE });
        });

};

const deleteBuyer = (id) => (dispatch) => {
    dispatch({ type: types.DELETE_BUYERS_REQUEST });
    return axios.delete(`https://brown-dress.cyclic.app/buyer/delete/${id}`)
        .then((res) => {
            dispatch({ type: types.DELETE_BUYERS_SUCCESS, payload: res.data });
            console.log("sellers", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.DELETE_BUYERS_FAILURE });
        });

};

const addBuyer = (payload) => (dispatch) => {
    dispatch({ type: types.ADD_BUYERS_REQUEST });
    return axios.post(`https://brown-dress.cyclic.app/buyer/add`, payload)
        .then((res) => {
            dispatch({ type: types.ADD_BUYERS_SUCCESS, payload: res.data });
            console.log("sellers", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.ADD_BUYERS_FAILURE });
        });

};


const getSeller = () => (dispatch) => {
    dispatch({ type: types.GET_SELLERS_REQUEST });
    return axios.get(`https://brown-dress.cyclic.app/seller`)
        .then((res) => {
            dispatch({ type: types.GET_SELLERS_SUCCESS, payload: res.data });
            console.log("sellers", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.GET_SELLERS_FAILURE });
        });

};

const deleteSeller = () => (dispatch) => {
    dispatch({ type: types.DELETE_SELLERS_REQUEST });
    return axios.delete(`https://brown-dress.cyclic.app/seller/delete/${id}`)
        .then((res) => {
            dispatch({ type: types.DELETE_SELLERS_SUCCESS, payload: res.data });
            console.log("sellers", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.DELETE_SELLERS_FAILURE });
        });

};

const addSeller = (payload) => (dispatch) => {
    dispatch({ type: types.ADD_SELLERS_REQUEST });
    return axios.post(`https://brown-dress.cyclic.app/seller/add`, payload)
        .then((res) => {
            dispatch({ type: types.ADD_SELLERS_SUCCESS, payload: res.data });
            console.log("sellers", res.data);
        })
        .catch((err) => {
            dispatch({ type: types.ADD_SELLERS_FAILURE });
        });

};


export { getBuyer, deleteBuyer, addBuyer, getSeller, deleteSeller, addSeller };