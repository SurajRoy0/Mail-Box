import React, { useEffect, useState } from "react";
import styles from "./Inbox.module.css";
import Email from "../UI/Email";
import { useDispatch, useSelector } from "react-redux";
import { gettingRecivedEmails } from "../../API/mail-api";
import { setUnReadEmails } from "../../Store/mail-reducer";

const Inbox = () => {
  const [emails, setEmails] = useState([]);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const dispatch = useDispatch();

  let totalUnreadEmails = emails?.reduce((curr, data) => {
    if (!data[1].data.isRead) curr++;
    return curr;
  }, 0);

  useEffect(() => {
    const fetchData = async () => {
      const res = await gettingRecivedEmails(userEmail);
      if (res) {
        setEmails(Object.entries(res).reverse());
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 2000);

    console.log("run");
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    dispatch(setUnReadEmails(totalUnreadEmails));
  }, [emails]);

  return (
    <div className={styles.inbox}>
      <h2>INBOX</h2>
      {emails?.map((data) => {
        return (
          <Email key={data[0]} email={data[1].data} id={data[0]} sent={false} />
        );
      })}
    </div>
  );
};

export default Inbox;
