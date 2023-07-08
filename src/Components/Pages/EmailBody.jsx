import React, { useEffect, useState } from "react";
import styles from "./EmailBody.module.css";
import { useParams } from "react-router-dom";
import { emailReadHandler, getInboxSingleEmail } from "../../API/mail-api";
import { useSelector } from "react-redux";
import { formatTimeStamp } from "../../HelperFunctions/helperFunctions";

const EmailBody = () => {
  const [email, setEmail] = useState({});
  const userEmail = useSelector((state) => state.auth.userEmail);
  const param = useParams();

  useEffect(() => {
    const fun = async () => {
      const res = await getInboxSingleEmail({
        email: userEmail,
        id: param.id,
      });
      setEmail(res.data);
    };
    fun();
  }, []);

  useEffect(() => {
    if (!email.isRead && email.isRead != undefined) {
      console.log(email);
      const emailRead = async () => {
        const res = await emailReadHandler({
          email: userEmail,
          id: param.id,
          data: {
            to: userEmail,
            from: email.from,
            message: email.message,
            timeStamp: email.timeStamp,
            isRead: true,
          },
        });
      };
      emailRead();
      console.log("isRead");
    }
  }, [email]);

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

export default EmailBody;
