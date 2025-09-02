import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const jwt = searchParams.jwt;

  if (!jwt) {
    return <div>Authentication error. Please try again.</div>;
  }

  if (process.env.NODE_ENV === "development") {
    const devToken = jwt; // saved in variable (dev mode only)
    console.log("Dev Mode Token:", devToken);
  }

  const res = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    return <div>Error fetching user data.</div>;
  }

  const user = await res.json();

  if (process.env.NODE_ENV === "development") {
    console.log("GitHub User Data:", user); // (dev mode only)
  }

  const cookieStore = await cookies();

  cookieStore.set("jwt", jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  cookieStore.set("user", JSON.stringify(user), {
    secure: process.env.NODE_ENV !== "development",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  redirect("/");
}
