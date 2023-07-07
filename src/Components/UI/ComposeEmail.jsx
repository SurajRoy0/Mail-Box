import React from "react";
import styles from "./ComposeEmail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { composeOpenHandler } from "../../Store/mail-reducer";
const ComposeEmail = () => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(composeOpenHandler())}
      className={styles.compose}
    >
      Compose Email
    </button>
  );
};

export default ComposeEmail;
