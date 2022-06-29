import {
  getCustomersFetching,
  getCustomersFulfilled,
  getCustomersRejected,
  getOneCustomerFetching,
  getOneCustomerFulfilled,
  getOneCustomerRejected,
  addCustomerFetching,
  addCustomerFulfilled,
  addCustomerRejected,
  updateCustomerFetching,
  updateCustomerFulfilled,
  updateCustomerRejected,
  deleteCustomerFetching,
  deleteCustomerFulfilled,
  deleteCustomerRejected,
} from "./actions";

export const getCustomers = () => (dispatch) => {
  dispatch(getCustomersFetching());
  return fetch("https://immense-savannah-17243.herokuapp.com/api/customers", {
    method: "GET",
    headers: { "Constente-Type": "application/json" },
  })
    .then((data) => data.json())
    .then((response) => {
      dispatch(getCustomersFulfilled(response));
    })
    .catch((error) => dispatch(getCustomersRejected(error)));
};

export const getOneCustomer = (dni) => (dispatch) => {
  dispatch(getOneCustomerFetching());
  return fetch(
    `https://immense-savannah-17243.herokuapp.com/api/customers/${dni}`,
    {
      method: "GET",
      headers: { "Constente-Type": "application/json" },
    }
  )
    .then((data) => {
      if (data.status !== 200) {
        return data.json().then((error) => {
          throw error;
        });
      }
      return data.json();
    })
    .then((response) => {
      dispatch(getOneCustomerFulfilled(response));
    })
    .catch((error) => {
      dispatch(getOneCustomerRejected(error));
    });
};

export const addCustomer = (data) => (dispatch) => {
  dispatch(addCustomerFetching());
  return fetch(`https://immense-savannah-17243.herokuapp.com/api/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dni: data.dni,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
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
      dispatch(addCustomerFulfilled(response));
    })
    .catch((error) => dispatch(addCustomerRejected(error)));
};

export const updateCustomer = (data) => (dispatch) => {
  dispatch(updateCustomerFetching());
  fetch(
    `https://immense-savannah-17243.herokuapp.com/api/customers/${data.dni}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        totalSale: data.totalSale,
        totalPay: data.totalPay,
      }),
    }
  )
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((error) => {
          throw error;
        });
      } else {
        dispatch(updateCustomerFulfilled());
      }
    })
    .catch((error) => dispatch(updateCustomerRejected(error)));
};

export const deleteCustomer = (dni) => (dispatch) => {
  dispatch(deleteCustomerFetching());
  return fetch(
    `https://immense-savannah-17243.herokuapp.com/api/customers/${dni}`,
    {
      method: "DELETE",
      headers: { "Constente-Type": "application/json" },
    }
  )
    .then((response) => {
      if (response.status !== 200) {
        return response.json().then((error) => {
          throw error;
        });
      } else {
        dispatch(deleteCustomerFulfilled(dni));
      }
    })
    .catch((error) => dispatch(deleteCustomerRejected(error)));
};
