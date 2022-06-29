const getCustomers = () => {
  return fetch(`https://powerful-oasis-31819.herokuapp.com//api/customers`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });
};

const getOneCustomer = (dni) => {
  return fetch(
    `https://powerful-oasis-31819.herokuapp.com//api/customers/${dni}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
};

const updateCustomer = (data) => {
  return fetch(
    `https://powerful-oasis-31819.herokuapp.com//api/customers/${data.dni}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dni: data.dni,
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        totalSale: data.sale,
        totalPay: data.pay,
      }),
    }
  ).then((response) => {
    return response;
  });
};

const createCustomer = (data) => {
  return fetch(`https://powerful-oasis-31819.herokuapp.com//api/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dni: data.dni,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
    }),
  }).then((response) => {
    return response;
  });
};

const deleteCustomer = (dni) => {
  return fetch(
    `https://powerful-oasis-31819.herokuapp.com//api/customers/${dni}`,
    {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }
  ).then((response) => {
    return response.json();
  });
};

export {
  getCustomers,
  getOneCustomer,
  updateCustomer,
  createCustomer,
  deleteCustomer,
};
