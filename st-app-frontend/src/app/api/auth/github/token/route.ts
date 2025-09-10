import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { code } = await request.json();

    if (!code) {
      return NextResponse.json({ error: "Code is required" }, { status: 400 });
    }

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      client_secret: process.env.GITHUB_CLIENT_SECRET!,
      code: code,
    });

    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params,
      }
    );

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error_description },
        { status: 400 }
      );
    }

    return NextResponse.json({ access_token: data.access_token });
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
