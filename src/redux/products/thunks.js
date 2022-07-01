import {
  getProductsFetching,
  getProductsFulfilled,
  getProductsRejected,
  getOneProductFetching,
  getOneProductFulfilled,
  getOneProductRejected,
  addProductFetching,
  addProductFulfilled,
  addProductRejected,
  deleteProductFetching,
  deleteProductFulfilled,
  deleteProductRejected,
  updateProductFetching,
  updateProductFulfilled,
  updateProductRejected,
} from "./actions";

export const getProducts = () => (dispatch) => {
  dispatch(getProductsFetching());
  fetch("https://immense-savannah-17243.herokuapp.com/api/products/", {
    method: "GET",
    headers: { "Constente-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((response) => dispatch(getProductsFulfilled(response)))
    .catch((error) => dispatch(getProductsRejected(error)));
};

export const getOneProduct = (sku) => (dispatch) => {
  dispatch(getOneProductFetching());
  fetch(`https://immense-savannah-17243.herokuapp.com/api/products/${sku}`, {
    method: "GET",
    headers: { "Constente-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((response) => dispatch(getOneProductFulfilled(response)))
    .catch((error) => dispatch(getOneProductRejected(error)));
};

export const addProduct = (data) => (dispatch) => {
  dispatch(addProductFetching());
  fetch("https://immense-savannah-17243.herokuapp.com/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sku: data.sku,
      description: data.description,
      price: data.price,
    }),
  })
    .then((data) => {
      if (data.status !== 200) {
        return data.json().then((error) => {
          throw error;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(addProductFulfilled(response));
    })
    .catch((error) => dispatch(addProductRejected(error)));
};

export const deleteProduct = (sku) => (dispatch) => {
  dispatch(deleteProductFetching());
  fetch(`https://immense-savannah-17243.herokuapp.com/api/products/${sku}`, {
    method: "DELETE",
    headers: { "Content-Type": "appliacarion/json" },
  })
    .then((data) => {
      if (data.status !== 200) {
        return data.json().then((error) => {
          throw error;
        });
      } else {
        dispatch(deleteProductFulfilled(sku));
      }
    })
    .catch((error) => dispatch(deleteProductRejected(error)));
};

export const updateProduct = (data) => (dispatch) => {
  dispatch(updateProductFetching());
  fetch(
    `https://immense-savannah-17243.herokuapp.com/api/products/${data.sku}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: data.description,
        price: data.price,
      }),
    }
  )
    .then((data) => {
      if (data.status !== 200) {
        return data.json().then((error) => {
          throw error;
        });
      } else {
        dispatch(updateProductFulfilled());
      }
    })
    .catch((error) => {
      dispatch(updateProductRejected(error));
    });
};
