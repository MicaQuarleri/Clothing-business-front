import React, { useState, useEffect } from "react";
import moment from "moment";
import styles from "./homePage.module.css";
import styleShared from "../../styles.module.css";
import { getProducts } from "../../redux/products/thunks";
import ModalNotFound from "../shared/ModalNotFound";
import ModalAccount from "../shared/ModalAccount";
import ModalSucess from "../shared/ModalSucess";
import InputSearch from "../shared/InputSearch";
import ActionButton from "../shared/ActionButton";
import SalesButton from "../shared/SalesButton";
import { getSales, updateSale, addSale } from "../../redux/sales/thunks";
import { useSelector, useDispatch } from "react-redux";

const HomePage = () => {
  const [skuValue, setSkuValue] = useState("");
  const [productsAdded, setProductsAdded] = useState([]);
  const [newId, setNewId] = useState(0);
  const [totalCash, setTotalCash] = useState(0);
  const [totalCreditCard, setTotalCreditCard] = useState(0);
  const [showModalNotFound, setShowModalNotFound] = useState(false);
  const [showModalAccount, setShowModalAccount] = useState(false);
  const [showModalSucess, setShowModalSucess] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(true);

  const dispatch = useDispatch();
  const products = useSelector((store) => store.products.list);
  const sales = useSelector((store) => store.sales.list);

  useEffect(() => {
    dispatch(getSales());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const addProduct = (sku) => {
    const productSelected = products.filter((product) => product.sku === sku);
    if (productSelected.length === 0) {
      setShowModalNotFound(true);
      setSkuValue("");
    } else {
      setNewId(newId + 1);
      let product = [
        {
          idNew: newId,
          sku: productSelected[0].sku,
          description: productSelected[0].description,
          price: productSelected[0].price,
        },
      ];
      setProductsAdded(productsAdded.concat(product));
      setSkuValue("");
      setTotalCash(totalCash + product[0].price);
      setTotalCreditCard(Math.round((totalCash + product[0].price) * 1.1));
      setButtonsDisabled(false);
    }
  };

  const deleteProduct = (id) => {
    setProductsAdded(productsAdded.filter((product) => product.idNew !== id));
    const deleteProduct = productsAdded.find((product) => product.idNew === id);
    setTotalCash(totalCash - deleteProduct.price);
    setTotalCreditCard(Math.round((totalCash - deleteProduct.price) * 1.1));
    if (products.length - 1 === 0) {
      setButtonsDisabled(true);
    }
  };

  const closeModalSucess = () => {
    setShowModalSucess(false);
  };

  const saveSale = (typeSale) => {
    let today = new Date().toLocaleDateString();
    let dates = [];
    let i = 0;
    for (i = 0; i < sales.length; i++) {
      dates.push(moment(sales[i].date).format("D/M/YYYY"));
    }
    const indexDate = dates.findIndex((date) => date === today);
    let data = {};
    if (indexDate >= 0) {
      switch (typeSale) {
        case "cash":
          const cash = sales[indexDate].totalCash + totalCash;
          data = {
            date: sales[indexDate].date,
            cash: cash,
          };
          break;
        case "card":
          const card = sales[indexDate].totalCard + totalCreditCard;
          data = {
            date: sales[indexDate].date,
            card: card,
          };
          break;
        case "account":
          const account = sales[indexDate].totalAccount + totalCreditCard;
          data = {
            date: sales[indexDate].date,
            account: account,
          };
          break;
        default:
          console.log("Not type of sale");
      }
      dispatch(updateSale(data));
    } else {
      switch (typeSale) {
        case "cash":
          data = {
            cash: totalCash,
          };
          break;
        case "card":
          data = {
            card: totalCreditCard,
          };
          break;
        case "account":
          data = {
            account: totalCreditCard,
          };
          break;
        default:
          console.log("Not type of sale");
      }
      dispatch(addSale(data));
    }
    setProductsAdded([]);
    setTotalCash(0);
    setTotalCreditCard(0);
    setButtonsDisabled(true);
    setShowModalSucess(true);
    setTimeout(closeModalSucess, 1000);
  };

  const saveCashSale = () => {
    const typeSale = "cash";
    saveSale(typeSale);
  };

  const saveCardSale = () => {
    const typeSale = "card";
    saveSale(typeSale);
  };

  const saveAccountSale = () => {
    const typeSale = "account";
    saveSale(typeSale);
    setShowModalAccount(false);
  };

  return (
    <div className={styles.homeContainer}>
      <ModalNotFound
        openModalNotFound={showModalNotFound}
        closeModalNotFound={() => setShowModalNotFound(false)}
        text="Sku does not exist"
      />
      <ModalAccount
        openModalAccount={showModalAccount}
        closeModalAccountX={() => setShowModalAccount(false)}
        closeModalAccountSave={saveAccountSale}
        saleCredit={totalCreditCard}
      />
      <ModalSucess
        openModal={showModalSucess}
        text="Successful sale"
        onblur={closeModalSucess}
      />
      <div className={styleShared.bottomContainer}>
        <InputSearch
          label="Search the sku"
          onChange={(event) => {
            setSkuValue(event.target.value);
          }}
          value={skuValue}
        />
        <ActionButton value={"+"} onClick={() => addProduct(skuValue)} />
      </div>
      <div className={styles.homeTable}>
        <table className={styleShared.bodyTable}>
          <thead>
            <tr>
              <th>Sku</th>
              <th>Description</th>
              <th>Cash Price</th>
              <th>Credit Card Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productsAdded.map((product) => {
              return (
                <tr key={product.idNew}>
                  <td>{product.sku}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{Math.round(product.price * 1.1)}</td>
                  <td>
                    <ActionButton
                      onClick={() => deleteProduct(product.idNew)}
                      value="X"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={styles.totals}>
        <div className={styles.subTotals}>
          <p>Cash:</p>
          <p>{totalCash}</p>
        </div>
        <div className={styles.subTotals}>
          <p>Credit Card:</p>
          <p>{totalCreditCard}</p>
        </div>
      </div>
      <div className={styles.buttons}>
        <SalesButton
          value="Cash"
          disabled={buttonsDisabled}
          onClick={() => saveCashSale("cash")}
        />
        <SalesButton
          value="Credit Card"
          disabled={buttonsDisabled}
          onClick={() => saveCardSale("card")}
        />
        <SalesButton
          value="Account"
          disabled={buttonsDisabled}
          onClick={() => setShowModalAccount(true)}
        />
      </div>
    </div>
  );
};

export default HomePage;
