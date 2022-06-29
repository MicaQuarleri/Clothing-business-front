import React from "react";
import styles from "./header.module.css";
import NavBar from "../NavBar";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className={styles.headerContainer}>
      <h1>
        <Link className={styles.link} to="/">
          Clothes Impact
        </Link>
      </h1>
      <NavBar />
    </header>
  );
};

export default Header;
