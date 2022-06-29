import React, { useState, useEffect } from "react";
import moment from "moment";
import { getSales } from "../../redux/sales/thunks";
import styleShared from "../../styles.module.css";
import styles from "./sales.module.css";
import IsLoading from "../shared/IsLoading";
import InputSearch from "../shared/InputSearch";
import ModalNotFound from "../shared/ModalNotFound";
import { useDispatch, useSelector } from "react-redux";

const Sales = () => {
  const [dateValue, setDateValue] = useState("");
  const [showModalNotFound, setShowModalNotFound] = useState(false);
  const sales = useSelector((store) => store.sales.list);
  const isLoading = useSelector((store) => store.sales.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSales());
  }, []);

  if (isLoading) return <IsLoading />;

  return (
    <div className={styles.salesContainer}>
      <ModalNotFound
        openModalNotFound={showModalNotFound}
        closeModalNotFound={() => setShowModalNotFound(false)}
        text="Not sale in that date"
      />
      <InputSearch
        label="Search a date"
        onChange={(event) => setDateValue(event.target.value)}
      />
      <div className={styles.salesTable}>
        <table className={styleShared.bodyTable}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Cash</th>
              <th>Credit Card</th>
              <th>Acount</th>
            </tr>
          </thead>
          <tbody>
            {sales
              .filter((sale) => {
                if (moment(sale.date).format("D/M/YY").includes(dateValue))
                  return sale;
              })
              .map((sale) => {
                return (
                  <tr key={sale.date}>
                    <td>{moment(sale.date).format("D/M/YY")}</td>
                    <td>{sale.totalCash}</td>
                    <td>{sale.totalCard}</td>
                    <td>{sale.totalAccount}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Sales;
