import {
  GET_CUSTOMERS_FETCHING,
  GET_CUSTOMERS_FULFILLED,
  GET_CUSTOMERS_REJECTED,
  GET_ONE_CUSTOMER_FETCHING,
  GET_ONE_CUSTOMER_FULFILLED,
  GET_ONE_CUSTOMER_REJECTED,
  ADD_CUSTOMER_FETCHING,
  ADD_CUSTOMER_FULFILLED,
  ADD_CUSTOMER_REJECTED,
  UPDATE_CUSTOMER_FETCHING,
  UPDATE_CUSTOMER_FULFILLED,
  UPDATE_CUSTOMER_REJECTED,
  DELETE_CUSTOMER_FETCHING,
  DELETE_CUSTOMER_FULFILLED,
  DELETE_CUSTOMER_REJECTED,
  ERROR_TO_DEFAULT,
} from "./constants";

export const getCustomersFetching = () => ({
  type: GET_CUSTOMERS_FETCHING,
});

export const getCustomersFulfilled = (payload) => ({
  type: GET_CUSTOMERS_FULFILLED,
  payload,
});

export const getCustomersRejected = (error) => ({
  type: GET_CUSTOMERS_REJECTED,
  payload: error,
});

export const getOneCustomerFetching = () => ({
  type: GET_ONE_CUSTOMER_FETCHING,
});

export const getOneCustomerFulfilled = (payload) => ({
  type: GET_ONE_CUSTOMER_FULFILLED,
  payload,
});

export const getOneCustomerRejected = (error) => ({
  type: GET_ONE_CUSTOMER_REJECTED,
  payload: error,
});

export const addCustomerFetching = () => ({
  type: ADD_CUSTOMER_FETCHING,
});

export const addCustomerFulfilled = (payload) => ({
  type: ADD_CUSTOMER_FULFILLED,
  payload,
});

export const addCustomerRejected = (error) => ({
  type: ADD_CUSTOMER_REJECTED,
  payload: error,
});

export const updateCustomerFetching = () => ({
  type: UPDATE_CUSTOMER_FETCHING,
});

export const updateCustomerFulfilled = () => ({
  type: UPDATE_CUSTOMER_FULFILLED,
});

export const updateCustomerRejected = (error) => ({
  type: UPDATE_CUSTOMER_REJECTED,
  payload: error,
});

export const deleteCustomerFetching = () => ({
  type: DELETE_CUSTOMER_FETCHING,
});

export const deleteCustomerFulfilled = (sku) => ({
  type: DELETE_CUSTOMER_FULFILLED,
  payload: sku,
});

export const deleteCustomerRejected = (error) => ({
  type: DELETE_CUSTOMER_REJECTED,
  payload: error,
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT,
});
