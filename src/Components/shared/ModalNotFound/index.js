import React from "react";
import styles from "./modalNotFound.module.css";
import styleShared from "../../../styles.module.css";

const ModalNotFound = ({ openModalNotFound, closeModalNotFound, text }) => {
  if (!openModalNotFound) {
    return null;
  } else {
    return (
      <div className={styleShared.modal}>
        <div className={styles.mainContainerSucessNotFound}>
          <button onClick={() => closeModalNotFound()}>X</button>
          <p>{text}</p>
        </div>
      </div>
    );
  }
};

export default ModalNotFound;
