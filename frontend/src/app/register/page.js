// src/app/register/page.js
"use client";
import RegisterForm from "../components/RegisterForm";
import styles from "../styles/Register.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.container}>
      <div className={styles.registerForm}>
        <RegisterForm />
      </div>
    </div>
  );
}
