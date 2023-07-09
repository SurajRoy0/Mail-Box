import React, { useEffect, useState } from "react";
import styles from "./EmailBody.module.css";
import { useParams } from "react-router-dom";
import { getSentSingleEmail } from "../../API/mail-api";
import { useSelector } from "react-redux";
import { formatTimeStamp } from "../../HelperFunctions/helperFunctions";

const EmailBodySent = () => {
  const [email, setEmail] = useState({});
  const userEmail = useSelector((state) => state.auth.userEmail);
  const param = useParams();
  useEffect(() => {
    const fun = async () => {
      const res = await getSentSingleEmail({
        email: userEmail,
        id: param.id,
      });
      setEmail(res.data);
    };
    fun();
  }, []);

  return (
    <div className={styles.emailBody}>
      <h1>Email</h1>
      <div className={styles[["email-heading"]]}>
        <h4 className={styles.emailFrom}>{email.from}</h4>
        <span className={styles.emailTimestamp}>
          {formatTimeStamp(email.timeStamp)}
        </span>
      </div>
      <p
        className={styles.emailMessage}
        dangerouslySetInnerHTML={{ __html: email.message }}
      ></p>
    </div>
  );
};

export default EmailBodySent;
