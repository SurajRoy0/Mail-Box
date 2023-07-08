import React, { useEffect, useState } from "react";
import styles from "./Inbox.module.css";
import Email from "../UI/Email";
import { useSelector } from "react-redux";
import { gettingRecivedEmails } from "../../API/mail-api";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    const fun = async () => {
      const res = await gettingRecivedEmails(userEmail);
      setEmails(Object.entries(res));
    };
    fun();
  }, []);

  return (
    <div className={styles.inbox}>
      <h2>INBOX</h2>
      {emails?.map((data) => {
        return <Email key={data[0]} email={data[1].data} id={data[0]} />;
      })}
    </div>
  );
};

export default Inbox;
