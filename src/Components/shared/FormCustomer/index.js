import React, { useState } from "react";
import styleShared from "../../../styles.module.css";
import {
  validateEmail,
  validatePhone,
  validateDni,
} from "../../../services/validateData";
import { updateCustomer, addCustomer } from "../../../redux/customers/thunks";
import InputForm from "../InputForm";
import { useDispatch } from "react-redux";

const FormCustomer = ({
  from,
  action,
  openForm,
  closeFormX,
  closeFormSave,
  dniValue,
  firstNameValue,
  lastNameValue,
  emailValue,
  phoneValue,
  totalPayValue,
  totalSaleValue,
}) => {
  const dispatch = useDispatch();

  const [errorDni, setErrorDni] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPhone, setErrorPhone] = useState("");
  const [disabled, setDisabled] = useState(true);

  const validateData = (event) => {
    if (
      errorDni === "" &&
      errorEmail === "" &&
      errorPhone === "" &&
      event.target.form[0].value !== "" &&
      event.target.form[1].value !== "" &&
      event.target.form[2].value !== "" &&
      event.target.form[4].value !== ""
    ) {
      setDisabled(false);
    }
  };

  const saveCustomer = (event) => {
    event.preventDefault();
    const pay = totalPayValue + Number(event.target[5].value);
    const data = {
      dni: event.target[0].value,
      firstName:
        event.target[1].value.charAt(0).toUpperCase() +
        event.target[1].value.substring(1),
      lastName:
        event.target[2].value.charAt(0).toUpperCase() +
        event.target[2].value.substring(1),
      email: event.target[3].value,
      phone: event.target[4].value,
      totalPay: pay,
      totalSale: totalSaleValue,
    };
    if (action === "edit") {
      dispatch(updateCustomer(data));
    } else {
      dispatch(addCustomer(data));
    }
    closeFormSave();
  };

  if (!openForm) {
    return null;
  } else {
    return (
      <div className={styleShared.modal}>
        <div className={styleShared.mainContainerForm}>
          <button onClick={closeFormX}>X</button>
          <div className={styleShared.formContainer}>
            <p>{`${action === "add" ? "Add Customer" : "Edit Customer"}`}</p>
            <form onSubmit={saveCustomer} onBlur={validateData}>
              <div className={styleShared.inputContainer}>
                <InputForm
                  name="dni"
                  label="Dni*:"
                  required="required"
                  defaultValue={`${
                    from === "account"
                      ? dniValue
                      : `${action === "add" ? "" : dniValue}`
                  }`}
                  onblur={(event) => {
                    setErrorDni(validateDni(event.target.value));
                  }}
                  onfocus={() => {
                    setDisabled(true);
                    setErrorDni("");
                  }}
                  disabled={`${
                    action === "edit" || from === "account" ? true : false
                  }`}
                />
                <span>{errorDni}</span>
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  name="firstName"
                  label="First Name*:"
                  required="required"
                  defaultValue={`${action === "add" ? "" : firstNameValue}`}
                  onfocus={() => {
                    setDisabled(true);
                  }}
                />
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  label="Last Name*:"
                  required="required"
                  defaultValue={`${action === "add" ? "" : lastNameValue}`}
                  onfocus={() => {
                    setDisabled(true);
                  }}
                />
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  label="Email:"
                  defaultValue={`${action === "add" ? "" : emailValue}`}
                  onblur={(event) => {
                    setErrorEmail(validateEmail(event.target.value));
                  }}
                  onfocus={() => {
                    setDisabled(true);
                    setErrorEmail("");
                  }}
                />
                <span>{errorEmail}</span>
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  label="Phone*:"
                  required="required"
                  defaultValue={`${action === "add" ? "" : phoneValue}`}
                  onblur={(event) => {
                    setErrorPhone(validatePhone(event.target.value));
                  }}
                  onfocus={() => {
                    setDisabled(true);
                    setErrorPhone("");
                  }}
                />
                <span>{errorPhone}</span>
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  inputShow={`${action === "add" ? false : true}`}
                  label="Total Pay"
                  defaultValue={0}
                  disabled={`${
                    action === "edit" && Number(totalSaleValue) > 0
                      ? false
                      : true
                  }`}
                />
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  inputShow={`${
                    action === "add" && from !== "account" ? false : true
                  }`}
                  label="Total Sale"
                  defaultValue={totalSaleValue}
                  disabled="true"
                />
              </div>
              <button disabled={disabled} type="submit">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default FormCustomer;
