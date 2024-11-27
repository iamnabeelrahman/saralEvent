// src/app/login/page.js
"use client";
import { useState } from "react";
import LoginForm from "../components/LoginForm";
import styles from "../../styles/Login.module.css";

export default function LoginPage() {
  const [user, setUser] = useState(null);

  const handleClose = () => {
    console.log("Login form closed");
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        <LoginForm setUser={setUser} onClose={handleClose} />
      </div>
    </div>
  );
}
