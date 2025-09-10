"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "axios";

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [status, setStatus] = useState("Processing...");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get("code");
      const githubError = searchParams.get("error");

      if (githubError) {
        setError("GitHub authorization was cancelled or failed");
        setStatus("Authentication cancelled");
        setTimeout(() => router.push("/"), 3000);
        return;
      }

      if (!code) {
        setError("No authorization code received from GitHub");
        setStatus("Authentication failed");
        setTimeout(() => router.push("/"), 3000);
        return;
      }

      try {
        setStatus("Exchanging authorization code...");

        const tokenResponse = await axios.post("/api/auth/github/token", {
          code,
        });
        const { access_token } = tokenResponse.data;

        if (!access_token) {
          throw new Error("No access token received");
        }

        setStatus("Authenticating with backend...");

        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

        try {
          const authResponse = await axios.post(
            `${strapiUrl}/api/auth/github/callback`,
            {
              access_token,
            }
          );

          const { jwt } = authResponse.data;

          if (jwt) {
            login(jwt);
            setStatus("Authentication successful! Redirecting...");
            setTimeout(() => router.push("/"), 1000);
          } else {
            throw new Error("No JWT token received from backend");
          }
        } catch (strapiError: unknown) {
          const strapiErr = strapiError as {
            message?: string;
            response?: { status?: number };
          };
          console.warn("⚠️ Strapi authentication failed:", strapiErr.message);

          if (strapiErr.response?.status === 405) {
            setError(
              "Backend authentication endpoint not configured (405 error)"
            );
            setStatus("Using mock authentication for demo...");

            await handleMockAuthentication(access_token);
          } else if (strapiErr.response?.status === 404) {
            setError("Backend authentication endpoint not found (404 error)");
            setStatus("Using mock authentication for demo...");
            await handleMockAuthentication(access_token);
          } else {
            setError(
              `Backend error: ${strapiErr.response?.status || "Unknown error"}`
            );
            setStatus("Authentication failed");
            setTimeout(() => router.push("/"), 5000);
          }
        }
      } catch (error: unknown) {
        const err = error as { message?: string };
        console.error("❌ Authentication error:", err);
        setError(err.message || "Authentication failed");
        setStatus("Authentication failed");
        setTimeout(() => router.push("/"), 5000);
      }
    };

    const handleMockAuthentication = async (accessToken: string) => {
      try {
        const userResponse = await fetch("https://api.github.com/user", {
          headers: {
            Authorization: `token ${accessToken}`,
            "User-Agent": "GitHub-OAuth-App",
          },
        });

        if (!userResponse.ok) {
          throw new Error("Failed to fetch user data from GitHub");
        }

        const githubUser = await userResponse.json();
        const mockJwt = `mock-jwt-${Date.now()}-${githubUser.id}`;

        const mockUser = {
          id: githubUser.id.toString(),
          username: githubUser.login,
          email:
            githubUser.email || `${githubUser.login}@users.noreply.github.com`,
          avatar: githubUser.avatar_url,
          firstName: githubUser.name?.split(" ")[0] || githubUser.login,
          lastName: githubUser.name?.split(" ").slice(1).join(" ") || "",
          provider: "github-mock",
        };

        login(mockJwt);

        if (typeof window !== "undefined") {
          localStorage.setItem("mock_user_data", JSON.stringify(mockUser));
        }

        setStatus("Mock authentication successful! Redirecting...");
        setTimeout(() => router.push("/"), 1000);
      } catch (mockError: unknown) {
        const err = mockError as { message?: string };
        console.error("Mock authentication failed:", err);
        setError("Mock authentication failed");
        setStatus("Authentication failed completely");
        setTimeout(() => router.push("/"), 3000);
      }
    };

    handleCallback();
  }, [searchParams, router, login]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <div className="text-center">
          {!error && (
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          )}

          {error && (
            <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
              <svg
                className="h-6 w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}

          {/* Status message */}
          <h2
            className={`text-xl font-semibold mb-2 ${
              error ? "text-red-600" : "text-gray-900"
            }`}
          >
            {error ? "Authentication Issue" : "Authenticating..."}
          </h2>

          <p className="text-gray-600 mb-4">{status}</p>

          {/* Error details */}
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-yellow-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Backend Not Available
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">{error}</p>
                  <p className="text-sm text-yellow-700 mt-1">
                    This is expected in development when Strapi backend is not
                    configured.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Manual redirect button */}
          <button
            onClick={() => router.push("/")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
