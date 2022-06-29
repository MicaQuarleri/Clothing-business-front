import {
  GET_SALES_FETCHING,
  GET_SALES_FULFILLED,
  GET_SALES_REJECTED,
  ADD_SALE_FETCHING,
  ADD_SALE_FULFILLED,
  ADD_SALE_REJECTED,
  UPDATE_SALE_FETCHING,
  UPDATE_SALE_FULFILLED,
  UPDATE_SALE_REJECTED,
  ERROR_TO_DEFAULT,
} from "./constants";

export const getSalesFetching = () => ({
  type: GET_SALES_FETCHING,
});

export const getSalesFulfilled = (payload) => ({
  type: GET_SALES_FULFILLED,
  payload,
});

export const getSalesRejected = (error) => ({
  type: GET_SALES_REJECTED,
  payload: error,
});

export const addSaleFetching = () => ({
  type: ADD_SALE_FETCHING,
});

export const addSaleFulfilled = (payload) => ({
  type: ADD_SALE_FULFILLED,
  payload,
});

export const addSaleRejected = (error) => ({
  type: ADD_SALE_REJECTED,
  payload: error,
});

export const updateSaleFetching = () => ({
  type: UPDATE_SALE_FETCHING,
});

export const updateSaleFulfilled = () => ({
  type: UPDATE_SALE_FULFILLED,
});

export const updateSaleRejected = (error) => ({
  type: UPDATE_SALE_REJECTED,
  payload: error,
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT,
});
