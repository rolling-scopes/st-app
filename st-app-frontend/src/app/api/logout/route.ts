import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.redirect("/");
  response.cookies.delete("jwt");
  response.cookies.delete("user");
  return response;
}
