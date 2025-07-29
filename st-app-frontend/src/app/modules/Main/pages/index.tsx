"use client";
import { ContentLayout } from "@/app/components/Content";
import { FooterLayout } from "@/app/components/Footer";
import { Layout, theme } from "antd";

export function MainPage() {
  const { token } = theme.useToken();
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout style={{ background: token.colorBgContainer }}>
        <ContentLayout />
      </Layout>
      <FooterLayout />
    </Layout>
  );
}
