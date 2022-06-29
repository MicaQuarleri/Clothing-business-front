import React from "react";
import styles from "./navBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <ul>
        <li>
          <Link className={styles.link} to="/customers">
            Customers
          </Link>
        </li>
        <li>
          <Link className={styles.link} to="/sales">
            Sales
          </Link>
        </li>
        <li>
          {" "}
          <Link className={styles.link} to="/products">
            Products
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
