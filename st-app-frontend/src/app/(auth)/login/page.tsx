"use client";
import React from "react";
import styles from "./LoginPage.module.scss";
import Image from "next/image";

const LoginPage = () => {
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const handleLogin = () => {
    window.location.href = `${BACKEND_URL}/api/connect/github`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Image
          src="/logo-rsschool3.png"
          alt="RS School Logo"
          width={500}
          height={500}
          layout="responsive"
          quality={75}
        />
        <p>
          Welcome to RS School! Learn, code, and grow with our open education
          platform.
        </p>
      </div>
      <div className={styles.right}>
        <div className={styles.loginBox}>
          <h1 className={styles.title}>Log In</h1>
          <button className={styles.githubButton} onClick={handleLogin}>
            Sign up with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
