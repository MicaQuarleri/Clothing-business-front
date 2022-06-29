import {
  GET_PRODUCTS_FETCHING,
  GET_PRODUCTS_FULFILLED,
  GET_PRODUCTS_REJECTED,
  GET_ONE_PRODUCT_FETCHING,
  GET_ONE_PRODUCT_FULFILLED,
  GET_ONE_PRODUCT_REJECTED,
  ADD_PRODUCT_FETCHING,
  ADD_PRODUCT_FULFILLED,
  ADD_PRODUCT_REJECTED,
  UPDATE_PRODUCT_FETCHING,
  UPDATE_PRODUCT_FULFILLED,
  UPDATE_PRODUCT_REJECTED,
  DELETE_PRODUCT_FETCHING,
  DELETE_PRODUCT_FULFILLED,
  DELETE_PRODUCT_REJECTED,
  ERROR_TO_DEFAULT,
} from "./constants";

export const getProductsFetching = () => ({
  type: GET_PRODUCTS_FETCHING,
});

export const getProductsFulfilled = (payload) => ({
  type: GET_PRODUCTS_FULFILLED,
  payload,
});

export const getProductsRejected = (error) => ({
  type: GET_PRODUCTS_REJECTED,
  payload: error,
});

export const getOneProductFetching = () => ({
  type: GET_ONE_PRODUCT_FETCHING,
});
export const getOneProductFulfilled = (payload) => ({
  type: GET_ONE_PRODUCT_FULFILLED,
  payload,
});
export const getOneProductRejected = (error) => ({
  type: GET_ONE_PRODUCT_REJECTED,
  payload: error,
});

export const addProductFetching = () => ({
  type: ADD_PRODUCT_FETCHING,
});
export const addProductFulfilled = (payload) => ({
  type: ADD_PRODUCT_FULFILLED,
  payload: payload,
});

export const addProductRejected = (error) => ({
  type: ADD_PRODUCT_REJECTED,
  payload: error,
});

export const updateProductFetching = () => ({
  type: UPDATE_PRODUCT_FETCHING,
});
export const updateProductFulfilled = () => ({
  type: UPDATE_PRODUCT_FULFILLED,
});
export const updateProductRejected = (error) => ({
  type: UPDATE_PRODUCT_REJECTED,
  payload: error,
});

export const deleteProductFetching = () => ({
  type: DELETE_PRODUCT_FETCHING,
});
export const deleteProductFulfilled = (sku) => ({
  type: DELETE_PRODUCT_FULFILLED,
  payload: sku,
});

export const deleteProductRejected = (error) => ({
  type: DELETE_PRODUCT_REJECTED,
  payload: error,
});

export const errorToDefault = () => ({
  type: ERROR_TO_DEFAULT,
});
