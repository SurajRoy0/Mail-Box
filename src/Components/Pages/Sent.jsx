import React, { useEffect, useState } from "react";
import styles from "./Inbox.module.css";
import Email from "../UI/Email";
import { useSelector } from "react-redux";
import { gettingSentEmails } from "../../API/mail-api";

const Sent = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);

  useEffect(() => {
    const fun = async () => {
      const res = await gettingSentEmails(userEmail);
      if (res) {
        setEmails(Object.entries(res).reverse());
      }
    };
    fun();
  }, []);

  return (
    <div className={styles.sent}>
      <h2>Sent Emails</h2>
      {emails?.map((data) => {
        return (
          <Email key={data[0]} email={data[1].data} id={data[0]} sent={true} />
        );
      })}
    </div>
  );
};

export default Sent;
