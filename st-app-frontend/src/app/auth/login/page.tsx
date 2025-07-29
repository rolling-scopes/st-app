"use client";

import styles from "./LoginPage.module.css";
import Image from "next/image";

const GITHUB_CLIENT_ID = "YOUR_GITHUB_CLIENT_ID";

const LoginPage = () => {
  const redirectToGitHub = () => {
    const githubAuthUrl = "https://github.com/login/oauth/authorize";
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/auth/github/callback"
    );
    const scope = "read:user user:email";
    window.location.href = `${githubAuthUrl}?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${redirectUri}&scope=${scope}`;
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
          <h1>Log In</h1>
          <button className={styles.githubButton} onClick={redirectToGitHub}>
            Sign up with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
