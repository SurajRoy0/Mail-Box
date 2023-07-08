import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideMenu.module.css";
import ComposeEmail from "./ComposeEmail";
import { FiInbox, FiSend, FiEdit, FiLogOut } from "react-icons/fi";

const SideMenu = () => {
  return (
    <div className={styles.sideMenu}>
      <div className={styles.compose}>
        <ComposeEmail />
      </div>

      <ul className={styles.menuItems}>
        <li>
          <NavLink className={styles.option} to="/">
            <FiInbox className={styles.icon} /> Inbox
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.option} to="/sent">
            <FiSend className={styles.icon} /> Sent
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.option} to="/drafts">
            <FiEdit className={styles.icon} /> Drafts
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
