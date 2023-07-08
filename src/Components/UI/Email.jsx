import React from "react";
import styles from "./Email.module.css";
import { Link } from "react-router-dom";
import { formatTimeStamp } from "../../HelperFunctions/helperFunctions";
import { FaCircle } from "react-icons/fa";

const Email = ({ id, email }) => {
  return (
    <Link to={`/emails/${id}`} className={styles.email}>
      <div>{!email.isRead && <FaCircle />}</div>
      <h4>{email.from}</h4>
      <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
      <span>{formatTimeStamp(email.timeStamp)}</span>
    </Link>
  );
};

export default Email;
