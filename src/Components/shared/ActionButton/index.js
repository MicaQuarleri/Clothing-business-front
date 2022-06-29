import React from "react";
import styleShared from "../../../styles.module.css";
import styles from "./actionButton.module.css";
import iconEdit from "../../../images/icon-edit.png";

const ActionButton = ({ onClick, value, action }) => {
  if (action === "edit") {
    return (
      <button className={styles.buttonActionEdit} onClick={onClick}>
        <img src={iconEdit} alt="editIcon" onClick={onClick} />
      </button>
    );
  } else {
    return (
      <button className={styleShared.buttonAction} onClick={onClick}>
        {value}
      </button>
    );
  }
};

export default ActionButton;
