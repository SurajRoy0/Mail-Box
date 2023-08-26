import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./SideMenu.module.css";
import ComposeEmail from "./ComposeEmail";
import { FiInbox, FiSend, FiEdit } from "react-icons/fi";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const totalUnreadEmails = useSelector((state) => state.mail.unReadEmails);

  return (
    <div className={styles.sideMenu}>
      <div className={styles.compose}>
        <ComposeEmail />
      </div>

      <ul className={styles.menuItems}>
        <li className={styles.inbox}>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : styles.option
            }
            to="/"
            exact
          >
            <FiInbox className={styles.icon} /> <span>Inbox</span>
          </NavLink>
          <span>{totalUnreadEmails}</span>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : styles.option
            }
            to="/sent"
          >
            <FiSend className={styles.icon} /> <span>Sent</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) =>
              isActive ? styles.active : styles.option
            }
            to="/drafts"
          >
            <FiEdit className={styles.icon} />
            <span>Drafts</span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default SideMenu;
