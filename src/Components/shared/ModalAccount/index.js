import React, { useState, useEffect } from "react";
import styles from "./modalAccount.module.css";
import styleShared from "../../../styles.module.css";
import FormCustomer from "../FormCustomer";
import ModalSucess from "../../shared/ModalSucess";
import { updateCustomer, getCustomers } from "../../../redux/customers/thunks";
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
  const customers = useSelector((store) => store.customers.list);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  const onChange = (event) => {
    setDniValue(event.target.value);
  };

  const validateDniInput = () => {
    const error = validateDni(dniValue);
    if (error === "") {
      const customerSelected = customers.find(
        (customer) => customer.dni === dniValue
      );
      if (customerSelected) {
        setDisabled(false);
      } else {
        setErrorDni("The customer`s dni does not exist");
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
      let totalSale = 0;
      const customerSelected = customers.find(
        (customer) => customer.dni === dniValue
      );
      if (customerSelected.totalSale !== undefined) {
        totalSale = customerSelected.totalSale + saleCredit;
      } else {
        totalSale = saleCredit;
      }
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

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  const closeFormX = () => {
    setErrorDni("");
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
