const getSales = () => {
  return fetch(`https://powerful-oasis-31819.herokuapp.com//api/sales`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  }).then((response) => {
    return response.json();
  });
};

const addSale = (data) => {
  return fetch(`https://powerful-oasis-31819.herokuapp.com//api/sales`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      cash: data.cash,
      card: data.card,
      account: data.account,
    }),
  }).then((response) => {
    return response.json();
  });
};

const updateSale = (data) => {
  return fetch(
    `https://powerful-oasis-31819.herokuapp.com//api/sales/${data.date}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cash: data.cash,
        card: data.card,
        account: data.account,
      }),
    }
  ).then((response) => {
    return response;
  });
};

export { getSales, addSale, updateSale };
