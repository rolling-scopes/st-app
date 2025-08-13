export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";

export async function getUserProfile() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
      credentials: "include",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function logout() {
  await fetch(`${BACKEND_URL}/api/logout`, {
    method: "POST",
    credentials: "include",
  });
  window.location.href = "/login";
}
