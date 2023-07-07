import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideMenu.module.css";
import ComposeEmail from "./ComposeEmail";

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <ComposeEmail />
      <ul className={styles.menuItems}>
        <li className={styles.option}>
          <NavLink to="/">Inbox</NavLink>
        </li>
        <li className={styles.option}>
          <NavLink to="/sent">Sent</NavLink>
        </li>
        <li className={styles.option}>
          <NavLink to="/drafts">Drafts</NavLink>
        </li>
        <li className={styles.option}>
          <NavLink to="/compose">Sign Out</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
