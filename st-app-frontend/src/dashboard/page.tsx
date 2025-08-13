"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserProfile, logout } from "@/app/lib/api";
import Image from "next/image";

interface User {
  username: string;
  avatar?: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUserProfile().then((u) => {
      if (!u) {
        router.push("/login");
      } else {
        setUser(u.user);
      }
    });
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <main style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome, {user.username}</h1>
      {user.avatar && (
        <Image src={user.avatar} alt="Avatar" width={80} height={80} />
      )}
      <p>You are logged in with GitHub 🎉</p>
      <button onClick={logout}>Logout</button>
    </main>
  );
}
