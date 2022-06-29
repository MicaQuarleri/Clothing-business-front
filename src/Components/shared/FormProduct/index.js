import React, { useState } from "react";
import styleShared from "../../../styles.module.css";
import InputForm from "../InputForm";
import { validatePrice } from "../../../services/validateData";
import { addProduct, updateProduct } from "../../../redux/products/thunks";
import { useDispatch } from "react-redux";

const FormProduct = ({
  openForm,
  closeFormX,
  closeFormSave,
  action,
  skuValue,
  descriptionValue,
  priceCashValue,
}) => {
  const [errorPrice, setErrorPrice] = useState("");
  const [disabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const validateData = (event) => {
    if (
      event.target.form[0].value !== "" &&
      event.target.form[1].value !== "" &&
      event.target.form[2].value !== ""
    ) {
      setDisabled(false);
    }
  };

  const saveProduct = (e) => {
    e.preventDefault();
    const data = {
      sku: e.target[0].value,
      description:
        e.target[1].value.charAt(0).toUpperCase() +
        e.target[1].value.substring(1),
      price: e.target[2].value,
    };
    if (action === "add") {
      dispatch(addProduct(data));
    } else {
      dispatch(updateProduct(data));
    }
    closeFormSave();
  };

  const closeForm = () => {
    closeFormX();
  };

  if (!openForm) {
    return null;
  } else {
    return (
      <div className={styleShared.modal}>
        <div className={styleShared.mainContainerForm}>
          <button onClick={closeForm}>X</button>
          <div className={styleShared.formContainer}>
            <p>{`${action === "add" ? "Add Product" : "Edit Product"}`}</p>
            <form onSubmit={saveProduct} onBlur={validateData}>
              <div className={styleShared.inputContainer}>
                <InputForm
                  label="SKU*:"
                  required="required"
                  disabled={`${action === "edit" ? true : false}`}
                  defaultValue={`${action === "add" ? "" : skuValue}`}
                />
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  label="Description*:"
                  required="required"
                  defaultValue={`${action === "add" ? "" : descriptionValue}`}
                />
              </div>
              <div className={styleShared.inputContainer}>
                <InputForm
                  label="Cash Price*:"
                  required="required"
                  defaultValue={`${action === "add" ? "" : priceCashValue}`}
                  onblur={(event) => {
                    setErrorPrice(validatePrice(event.target.value));
                  }}
                  onfocus={() => {
                    setErrorPrice("");
                  }}
                />
                <span>{errorPrice}</span>
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

export default FormProduct;
