import {
  getSalesFetching,
  getSalesFulfilled,
  getSalesRejected,
  addSaleFetching,
  addSaleFulfilled,
  addSaleRejected,
  updateSaleFetching,
  updateSaleFulfilled,
  updateSaleRejected,
} from "./actions";

export const getSales = () => (dispatch) => {
  getSalesFetching();
  fetch("https://immense-savannah-17243.herokuapp.com/api/sales", {
    method: "GET",
    content: { "Content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((response) => {
      dispatch(getSalesFulfilled(response));
    })
    .catch((error) => dispatch(getSalesRejected(error)));
};

export const addSale = (data) => (dispatch) => {
  dispatch(addSaleFetching());
  return fetch(`https://immense-savannah-17243.herokuapp.com/api/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cash: data.cash,
      card: data.card,
      account: data.account,
    }),
  })
    .then((result) => {
      if (result.status !== 200) {
        return result.json().then((error) => {
          throw error;
        });
      }
      return result.json();
    })
    .then((response) => {
      dispatch(addSaleFulfilled(response));
    })
    .then((error) => dispatch(addSaleRejected(error)));
};

export const updateSale = (data) => (dispatch) => {
  dispatch(updateSaleFetching());
  fetch(`https://immense-savannah-17243.herokuapp.com/api/sales/${data.date}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cash: data.cash,
      card: data.card,
      account: data.account,
    }),
  })
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((error) => {
          throw error;
        });
      } else {
        dispatch(updateSaleFulfilled());
      }
    })
    .catch((error) => dispatch(updateSaleRejected(error)));
};
