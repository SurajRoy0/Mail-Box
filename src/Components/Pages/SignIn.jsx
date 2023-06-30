import React, { useState } from "react";
import styles from "./SignIn.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { signIn } from "../../API/AuthAPI";
import { authActions } from "../../Store/auth-reducer";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [loader, setLoader] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const goToSignUpHandler = () => {
    navigate("/sign-up");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (password.trim().length < 8) {
      setIsPasswordValid(true);
      return;
    }
    const data = await signIn({
      email,
      password,
    });
    if (data.idToken) {
      dispatch(
        authActions.signIn({
          token: data.idToken,
          userName: data.displayName,
          userEmail: data.email,
        })
      );
      setEmail("");
      setPassword("");
      toast.success("Account Created Successfully", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    } else {
      toast.error("Failed! Please Try Again", {
        position: "top-center",
        autoClose: 5000,
        theme: "colored",
      });
    }
    setLoader(false);
  };

  const passwordResetHandler = async () => {};
  return (
    <>
      <div className={styles.container}>
        <ToastContainer />
        <h2 className={styles.title}>Sign In</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            {isPasswordValid && (
              <p className={styles["wrong-password"]}>
                Minimum 8 caracters required
              </p>
            )}
          </div>
          <p
            onClick={passwordResetHandler}
            className={styles["reset-password"]}
          >
            Forgot Password?
          </p>
          <button className={styles.button} type="submit">
            {loader ? "Please Wait" : "Sign In"}
          </button>
        </form>
        <p onClick={goToSignUpHandler} className={styles["change-auth"]}>
          Don't have any account? Create New Account
        </p>
      </div>
    </>
  );
};

export default SignIn;
