"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./SuccessPage.module.scss";
import { BACKEND_URL } from "@/app/lib/api";

export default function SuccessPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setTimeout(() => {
            router.push("/dashboard");
          }, 1000);
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className={styles.container}>
      {loading ? <p>Authenticating... Please wait</p> : <p>Redirecting...</p>}
    </div>
  );
}
