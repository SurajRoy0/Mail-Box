import React from "react";
import styles from "./Email.module.css";

function formatTimeStamp(timeStamp) {
  const formattedDate = new Date(timeStamp).toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  return formattedDate;
}
const Email = ({ id, email }) => {
  console.log(email);
  return (
    <div className={styles.email}>
      <h4>{email.from}</h4>
      <p dangerouslySetInnerHTML={{ __html: email.message }}></p>
      <span>{formatTimeStamp(email.timeStamp)}</span>
    </div>
  );
};

export default Email;
