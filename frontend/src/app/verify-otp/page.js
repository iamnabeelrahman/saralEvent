// src/app/verifyotp/page.js
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/VerifyOtp.module.css";

export default function VerifyOtp({ searchParams }) {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState(null);
  const email = searchParams.email;
  const router = useRouter();

  const handleVerifyOtp = async () => {
    try {
      const res = await fetch("/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        setStatus("success");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        setStatus("failure");
        setTimeout(() => setStatus(null), 1500);
      }
    } catch (error) {
      console.error("Error during OTP verification:", error);
      setStatus("failure");
      setTimeout(() => setStatus(null), 1500);
    }
  };

  const handleSendOtp = async () => {
    try {
      const res = await fetch("/api/otp/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("otp-sent");
        setTimeout(() => setStatus(null), 1500);
      } else {
        setStatus("failure");
        setTimeout(() => setStatus(null), 1500);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      setStatus("failure");
      setTimeout(() => setStatus(null), 1500);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {status === "success" && (
          <div className={styles.animationContainer}>
            <div className={styles.greenTick}>✔</div>
            <p className={styles.successMessage}>OTP Verified Successfully!</p>
          </div>
        )}
        {status === "failure" && (
          <div className={styles.animationContainer}>
            <div className={styles.redCross}>✘</div>
            <p className={styles.failureMessage}>Operation Failed!</p>
          </div>
        )}
        {status === "otp-sent" && (
          <div className={styles.animationContainer}>
            <div className={styles.greenTick}>✔</div>
            <p className={styles.successMessage}>OTP Sent to Your Email!</p>
          </div>
        )}
        {status === null && (
          <>
            <p className={styles.prompt}>
              Your account is not verified. Click "Send OTP" to verify.
            </p>
            <button onClick={handleSendOtp} className={styles.button}>
              Send OTP
            </button>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className={styles.input}
            />
            <button onClick={handleVerifyOtp} className={styles.button}>
              Verify OTP
            </button>
          </>
        )}
      </div>
    </div>
  );
}
