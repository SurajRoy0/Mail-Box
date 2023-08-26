import React from "react";
import styles from "./Email.module.css";
import { Link } from "react-router-dom";
import { formatTimeStamp } from "../../HelperFunctions/helperFunctions";
import { FaCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { deteleEmail } from "../../API/mail-api";

const Email = ({ id, email, sent }) => {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const path = sent ? `/sent/${id}` : `/emails/${id}`;
  const deleteEmailHandler = async () => {
    const res = await deteleEmail({
      email: userEmail,
      id: id,
    });
    console.log(res);
  };
  return (
    <div className={styles.container}>
      <Link to={path} className={styles.email}>
        <div>{!sent && !email.isRead && <FaCircle />}</div>
        <div className={styles.identifier}>
          <h4>{sent ? email.to : email.from}</h4>
        </div>
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
