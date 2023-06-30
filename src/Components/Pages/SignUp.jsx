import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signUp } from "../../API/AuthAPI";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPassword, setIsConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const goToSignInHandler = () => {
    navigate("/sign-in");
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setIsPasswordValid(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setIsConfirmPassword(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim().length < 8) {
      setIsPasswordValid(true);
      return;
    }

    if (password !== confirmPassword) {
      setIsConfirmPassword(true);
      return;
    }
    const data = await signUp({
      email,
      password,
    });

    if (data.idToken) {
      setEmail("");
      setPassword("");
      setConfirmPassword("");
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
  };

  return (
    <div className={styles.container}>
      <ToastContainer />
      <h2 className={styles.title}>Sign Up</h2>
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
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Confirm Password:</label>
          <input
            className={styles.input}
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
          />
          {isPasswordValid && (
            <p className={styles["wrong-password"]}>
              Minimum 8 caracters required
            </p>
          )}
          {isConfirmPassword && (
            <p className={styles["wrong-password"]}>
              Please Input Same Password
            </p>
          )}
        </div>
        <button className={styles.button} type="submit">
          Sign Up
        </button>
      </form>
      <p onClick={goToSignInHandler} className={styles["change-auth"]}>
        Have an account? Sign In...
      </p>
    </div>
  );
};

export default SignUp;
