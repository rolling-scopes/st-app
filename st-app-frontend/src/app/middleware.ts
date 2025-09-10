import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;
  const tokenExp = request.cookies.get("token_exp")?.value;

  if (request.nextUrl.pathname === "/") {
    if (!jwt || !tokenExp) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (parseInt(tokenExp) < Date.now()) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("jwt");
      response.cookies.delete("user");
      response.cookies.delete("token_exp");
      return response;
    }

    const res = await fetch(`${process.env.STRAPI_URL}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    if (!res.ok) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("jwt");
      response.cookies.delete("user");
      response.cookies.delete("token_exp");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
