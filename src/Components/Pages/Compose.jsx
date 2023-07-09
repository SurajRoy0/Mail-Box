import React, { useRef } from "react";
import JoditEditor from "jodit-react";
import styles from "./Compose.module.css";
import { useDispatch, useSelector } from "react-redux";
import { composeCloseHandler } from "../../Store/mail-reducer";
import { sentForInbox, sentForSentbox } from "../../API/mail-api";
import { useNavigate } from "react-router-dom";

const MailBox = () => {
  const toEmail = useRef();
  const areaRef = useRef();
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSend = async () => {
    const email = toEmail.current.value;
    const message = areaRef.current.value;
    const emailObj = {
      to: email,
      from: user.userEmail,
      message: message,
      timeStamp: new Date(),
      isRead: false,
    };
    const res = await sentForInbox({
      toEmail: email,
      data: emailObj,
    });
    if (res.name) {
      const sentRes = await sentForSentbox({
        fromEmail: user.userEmail,
        data: emailObj,
      });
      if (sentRes.name) {
        alert("Email Sent");
        toEmail.current.value = "";
        areaRef.current.value = "";
        dispatch(composeCloseHandler());
        navigate("/sent");
      }
    } else {
      alert("Failed! Please Try Again");
    }
  };

  return (
    <div className={styles.composeContainer}>
      <div className={module.closeDiv}>
        <div
          onClick={() => dispatch(composeCloseHandler())}
          className={styles.close}
        >
          Close
        </div>
      </div>
      <div className={styles.mail}>
        <div>
          <input type="email" placeholder="To" ref={toEmail} />
        </div>
        <JoditEditor
          ref={areaRef}
          config={{
            width: 500,
            height: 350,
          }}
        />
      </div>
      <div className={styles.action}>
        <button className={styles.btn} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MailBox;
