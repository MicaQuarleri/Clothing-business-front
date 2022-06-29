import React, { useState, useEffect } from "react";
import { getCustomers, deleteCustomer } from "../../redux/customers/thunks";
import styleShared from "../../styles.module.css";
import styles from "./customers.module.css";
import IsLoading from "../shared/IsLoading";
import InputSearch from "../shared/InputSearch";
import ModalNotFound from "../shared/ModalNotFound";
import ModalSucess from "../shared/ModalSucess";
import ActionButton from "../shared/ActionButton";
import FormCustomer from "../shared/FormCustomer";
import { useDispatch, useSelector } from "react-redux";

const Customers = () => {
  const [inputValue, setInputValue] = useState("");
  const [dniValue, setDniValue] = useState("");
  const [firstNameValue, setFirstNameValue] = useState("");
  const [lastNameValue, setLastNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [totalSaleValue, setTotalSaleValue] = useState("");
  const [totalPayValue, setTotalPayValue] = useState("");
  const [textSucess, setTextSucess] = useState("");
  const [showModalNotFound, setShowModalNotFound] = useState(false);
  const [showModalSucess, setShowModalSucess] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [action, setAction] = useState("");

  const dispatch = useDispatch();

  const customers = useSelector((store) => store.customers.list);
  const isLoading = useSelector((store) => store.customers.isLoading);

  useEffect(() => {
    dispatch(getCustomers());
  }, [dispatch]);

  const closeModalNotFound = () => {
    setShowModalNotFound(false);
  };

  const addCustomer = () => {
    setAction("add");
    setShowForm(true);
    setTextSucess("Customer saved");
  };

  const customerDelete = (dni) => {
    dispatch(deleteCustomer(dni));
    setTextSucess("Customer deleted");
    setShowModalSucess(true);
    setTimeout(closeModalSucess, 1100);
  };

  const editCustomer = (dni, firstName, lastName, email, phone, sale, pay) => {
    setAction("edit");
    setDniValue(dni);
    setFirstNameValue(firstName);
    setLastNameValue(lastName);
    setEmailValue(email);
    setPhoneValue(phone);
    setTotalSaleValue(sale);
    setTotalPayValue(pay);
    setTextSucess("Customer updated");
    setShowForm(true);
  };

  const closeModalSucess = () => {
    setShowModalSucess(false);
  };

  const closeFormX = () => {
    setShowForm(false);
  };

  const refresh = () => {
    dispatch(getCustomers());
  };

  const closeFormSave = () => {
    setShowForm(false);
    setShowModalSucess(true);
    if (action === "edit") {
      setTimeout(refresh);
    }
    setTimeout(closeModalSucess, 1100);
  };

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.customersContainer}>
      <FormCustomer
        action={action}
        openForm={showForm}
        closeFormX={closeFormX}
        closeFormSave={closeFormSave}
        dniValue={dniValue}
        firstNameValue={firstNameValue}
        lastNameValue={lastNameValue}
        emailValue={emailValue}
        phoneValue={phoneValue}
        totalPayValue={totalPayValue}
        totalSaleValue={totalSaleValue}
      />
      <ModalNotFound
        openModalNotFound={showModalNotFound}
        closeModalNotFound={closeModalNotFound}
        text="Dni does not exist"
      />
      <ModalSucess
        openModal={showModalSucess}
        text={textSucess}
        onblur={closeModalSucess}
      />
      <div className={styleShared.bottomContainer}>
        <InputSearch
          label="Search a customer"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <ActionButton onClick={addCustomer} value={"+"} action={action} />
      </div>
      <div className={styles.customersTable}>
        <table className={styleShared.bodyTable}>
          <thead>
            <tr>
              <th>Dni</th>
              <th>Name</th>
              <th>Last Name</th>
              <th>Total Sale</th>
              <th>Total Pay</th>
              <th>Diference</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {customers
              .filter((customer) => {
                if (
                  customer.dni.includes(inputValue) ||
                  customer.first_name
                    ?.toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  customer.last_name
                    ?.toLowerCase()
                    .includes(inputValue.toLowerCase())
                )
                  return customer;
              })
              .map((customer) => (
                <tr key={customer.dni}>
                  <td>{customer.dni}</td>
                  <td>{customer.first_name}</td>
                  <td>{customer.last_name}</td>
                  <td>{customer.totalSale}</td>
                  <td>{customer.totalPay}</td>
                  <td>
                    {Number(customer.totalSale) - Number(customer.totalPay)}
                  </td>
                  <td>
                    <ActionButton
                      onClick={() =>
                        editCustomer(
                          customer.dni,
                          customer.first_name,
                          customer.last_name,
                          customer.email,
                          customer.phone,
                          customer.totalSale,
                          customer.totalPay
                        )
                      }
                      action={"edit"}
                    />
                  </td>
                  <td>
                    <ActionButton
                      onClick={() => customerDelete(customer.dni)}
                      value="X"
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
