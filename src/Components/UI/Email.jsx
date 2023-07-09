import React from "react";
import styles from "./Email.module.css";
import { Link } from "react-router-dom";
import { formatTimeStamp } from "../../HelperFunctions/helperFunctions";
import { FaCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { deteleEmail } from "../../API/mail-api";

const Email = ({ id, email }) => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const deleteEmailHandler = async () => {
    const res = await deteleEmail({
      email: userEmail,
      id: id,
    });
    console.log(res);
  };
  return (
    <div className={styles.container}>
      <Link to={`/emails/${id}`} className={styles.email}>
        <div>{!email.isRead && <FaCircle />}</div>
        <h4>{email.from}</h4>
        <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
        <span>{formatTimeStamp(email.timeStamp)}</span>
      </Link>
      <div className={styles.delete}>
        <button onClick={deleteEmailHandler}>Delete</button>
      </div>
    </div>
  );
};

export default Email;
