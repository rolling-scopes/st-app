"use client";
import { ContentLayout } from "@/app/components/Content";
import { FooterLayout } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";

export function MainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <ContentLayout />
        </div>
      </main>
      <FooterLayout />
    </div>
  );
}
