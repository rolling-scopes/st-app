"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Image from "next/image";

export default function GitHubLogin() {
  const { logout, isAuthenticated, user, isLoading, isMockAuth } = useAuth();
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const handleGitHubLogin = () => {
    setIsAuthenticating(true);

    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/auth/callback`;
    const scope = "user:email";

    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;

    window.location.href = githubAuthUrl;
  };

  const handleLogout = () => {
    logout();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mr-3"></div>
        <span>Loading authentication...</span>
      </div>
    );
  }

  if (isAuthenticated && user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-4 p-4">
          <Image
            className="w-16 h-16 rounded-full border-2 border-gray-200"
            src={user.avatar || "/default-avatar.png"}
            alt="Avatar"
            width={40}
            height={40}
          />
          <div>
            <h2 className="text-xl font-bold">
              {user.firstName || user.username}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>

        {isMockAuth && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <div className="flex items-center">
              <svg
                className="h-4 w-4 text-yellow-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-sm text-yellow-800">
                Demo Mode: Using mock authentication (backend not available)
              </span>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">
          Welcome to GitHub OAuth Demo
        </h2>
        <p className="text-gray-600 mb-6">
          Sign in with your GitHub account to continue
        </p>

        <button
          onClick={handleGitHubLogin}
          disabled={isAuthenticating}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
          {isAuthenticating
            ? "Redirecting to GitHub..."
            : "Continue with GitHub"}
        </button>

        <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This demo handles backend connectivity issues
            gracefully. If the Strapi backend is not configured, it will use
            mock authentication for demonstration purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
