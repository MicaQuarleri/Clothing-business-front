import React from "react";
import styles from "./modalSucess.module.css";
import styleShared from "../../../styles.module.css";
import iconOk from "../../../images/icon-ok.PNG";

const ModalSucess = ({ openModal, text }) => {
  if (!openModal) {
    return null;
  } else {
    return (
      <div className={styleShared.modal}>
        <div className={styles.mainContainerSucess}>
          <img src={iconOk} alt="icon-ok" />
          <p>{text}</p>
        </div>
      </div>
    );
  }
};

export default ModalSucess;
