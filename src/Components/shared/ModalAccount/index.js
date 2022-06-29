import React, { useState } from "react";
import styles from "./modalAccount.module.css";
import styleShared from "../../../styles.module.css";
import FormCustomer from "../FormCustomer";
import ModalSucess from "../../shared/ModalSucess";
import {
  getOneCustomer,
  updateCustomer,
} from "../../../redux/customers/thunks";
import { validateDni } from "../../../services/validateData";
import { useDispatch, useSelector } from "react-redux";

const ModalAccount = ({
  openModalAccount,
  closeModalAccountX,
  closeModalAccountSave,
  saleCredit,
}) => {
  const [errorDni, setErrorDni] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [dniValue, setDniValue] = useState("");
  const [openForm, setOpenform] = useState(false);
  const [showModalSucess, setShowModalSucess] = useState(false);

  const dispatch = useDispatch();
  const customerSelected = useSelector((store) => store.customers.selected);
  const errorSelected = useSelector((store) => store.customers.error);
  const errorMessage = useSelector((store) => store.customers.errorMessage);

  const onChange = (event) => {
    setDniValue(event.target.value);
    dispatch(getOneCustomer(event.target.value));
  };

  const validateDniInput = () => {
    const error = validateDni(dniValue);
    if (error === "") {
      if (customerSelected !== "" && errorSelected === false) {
        setDisabled(false);
      } else {
        setErrorDni(errorMessage);
        setDisabled(false);
      }
    } else {
      setErrorDni(error);
      setDisabled(true);
    }
  };

  const hideDni = () => {
    setErrorDni("");
    setDisabled(true);
  };

  const accountSale = (event) => {
    event.preventDefault();
    if (errorDni === "") {
      const totalSale = customerSelected.totalSale + saleCredit;
      const data = { dni: dniValue, totalSale: totalSale };
      dispatch(updateCustomer(data));
      closeModalAccountSave();
    } else {
      setOpenform(true);
      setErrorDni("");
    }
  };

  const closeModalSucess = () => {
    setShowModalSucess(false);
  };

  const closeFormSave = () => {
    setOpenform(false);
    setShowModalSucess(true);
    setTimeout(closeModalSucess, 1100);
  };

  const closeFormX = () => {
    setErrorDni("The customer`s dni does not exist");
    setOpenform(false);
  };

  if (!openModalAccount) {
    return null;
  } else {
    return (
      <div className={styleShared.modal}>
        <ModalSucess
          openModal={showModalSucess}
          text={"Customer saved"}
          onblur={closeModalSucess}
        />
        <FormCustomer
          from="account"
          action={"add"}
          openForm={openForm}
          closeFormX={closeFormX}
          closeFormSave={closeFormSave}
          dniValue={dniValue}
          totalSaleValue={saleCredit}
        />
        <div className={styles.mainContainerAccount}>
          <button onClick={() => closeModalAccountX()}>X</button>
          <div>
            <form onSubmit={accountSale} className={styles.information}>
              <label>DNI:</label>
              <input
                onChange={onChange}
                onBlur={validateDniInput}
                onFocus={hideDni}
              ></input>
              <span>{errorDni}</span>
              <p>${saleCredit}</p>
              <button type="submit" disabled={disabled}>
                {`${
                  errorDni !== "The customer`s dni does not exist"
                    ? "Save"
                    : `${
                        errorDni === "The customer`s dni does not exist"
                          ? "Add Customer"
                          : "Save"
                      }`
                }`}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalAccount;
