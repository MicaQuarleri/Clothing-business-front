import React, { useState, useEffect } from "react";
import { getProducts, deleteProduct } from "../../redux/products/thunks";
import styles from "./products.module.css";
import styleShared from "../../styles.module.css";
import IsLoading from "../shared/IsLoading";
import InputSearch from "../shared/InputSearch";
import ActionButton from "../shared/ActionButton";
import FormProduct from "../shared/FormProduct";
import ModalSucess from "../shared/ModalSucess";
import { useSelector, useDispatch } from "react-redux";

const Products = () => {
  const [skuValue, setSkuValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState([]);
  const [priceValue, setPriceValue] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showModalSucess, setShowModalSucess] = useState(false);
  const [textSucess, setTextSucess] = useState("");
  const [action, setAction] = useState("");

  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.list);
  const isLoading = useSelector((store) => store.products.isLoading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addProduct = () => {
    setAction("add");
    setShowForm(true);
    setTextSucess("Product added");
  };

  const productDelete = (sku) => {
    dispatch(deleteProduct(sku));
    setTextSucess("Product deleted");
    setShowModalSucess(true);
    setTimeout(closeModalSucess, 1100);
  };

  const editProduct = (sku, description, price) => {
    setAction("edit");
    setSkuValue(sku);
    setDescriptionValue(description);
    setPriceValue(price);
    setTextSucess("Product updated");
    setShowForm(true);
  };

  const closeModalSucess = () => {
    setShowModalSucess(false);
  };

  const closeFormX = () => {
    setShowForm(false);
  };

  const refresh = () => {
    dispatch(getProducts());
  };

  const closeFormSave = () => {
    setShowForm(false);
    setShowModalSucess(true);
    if (action === "edit") {
      setTimeout(refresh);
    }
    setTimeout(closeModalSucess, 1100);
  };

  if (isLoading) {
    return <IsLoading />;
  }

  return (
    <div className={styles.productsContainer}>
      <ModalSucess
        openModal={showModalSucess}
        text={textSucess}
        onblur={closeModalSucess}
      />
      <FormProduct
        openForm={showForm}
        closeFormX={closeFormX}
        closeFormSave={closeFormSave}
        action={action}
        skuValue={skuValue}
        descriptionValue={descriptionValue}
        priceCashValue={priceValue}
      />
      <div className={styleShared.bottomContainer}>
        <InputSearch
          label="Search a product"
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <ActionButton value={"+"} onClick={addProduct} action="add" />
      </div>
      <div className={styles.productsTable}>
        <table className={styleShared.bodyTable}>
          <thead>
            <tr>
              <th>Sku</th>
              <th>Description</th>
              <th>Cash Price</th>
              <th>Credit Card Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) => {
                if (
                  product.sku
                    ?.toLowerCase()
                    .includes(inputValue.toLowerCase()) ||
                  product.description
                    ?.toLowerCase()
                    .includes(inputValue.toLowerCase())
                )
                  return product;
              })
              .map((product) => (
                <tr key={product._id}>
                  <td>{product.sku}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{Math.round(product.price * 1.1)}</td>
                  <td>
                    <ActionButton
                      action={"edit"}
                      onClick={() =>
                        editProduct(
                          product.sku,
                          product.description,
                          product.price
                        )
                      }
                    />
                  </td>
                  <td>
                    <ActionButton
                      value="X"
                      onClick={() => productDelete(product.sku)}
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

export default Products;
