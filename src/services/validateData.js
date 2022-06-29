const expresion = /^([0-9])*$/;

export const validateDni = (dni) => {
  let error = "";
  if (
    dni.includes("*") ||
    dni.includes("#") ||
    dni.includes(".") ||
    dni.length <= 6 ||
    !expresion.test(dni)
  ) {
    error = "Insert a valid dni without .";
    return error;
  } else {
    return error;
  }
};

export const validateEmail = (email) => {
  let error = "";
  if (!email.includes("@") && email !== "") {
    error = "Insert a valid email";
    return error;
  } else {
    return error;
  }
};

export const validatePhone = (phone) => {
  let error = "";
  if (
    phone.includes("*") ||
    phone.includes("#") ||
    phone.includes(".") ||
    !expresion.test(phone)
  ) {
    error = "Insert a valid phone";
    return error;
  } else {
    return error;
  }
};

export const validatePrice = (price) => {
  let error = "";
  if (
    price.includes("*") ||
    price.includes("#") ||
    price.includes(".") ||
    !expresion.test(price)
  ) {
    error = "Insert a valid price";
    return error;
  } else {
    return error;
  }
};
