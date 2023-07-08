import React from "react";
import styles from "./LogoHeader.module.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../Store/auth-reducer";
const LogoHeader = () => {
  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(authActions.signOut());
  };
  return (
    <div className={styles["logo-container"]}>
      <h1>MAIL BOX</h1>
      <button onClick={signOutHandler}>Sign Out</button>
    </div>
  );
};

export default LogoHeader;
